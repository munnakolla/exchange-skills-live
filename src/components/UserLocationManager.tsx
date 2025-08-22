import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  MapPin, 
  Navigation, 
  Plus,
  Edit,
  Trash,
  Home,
  Briefcase,
  Coffee,
  BookOpen,
  Trees,
  Building,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Location, LocationService } from "@/services/locationService";

interface UserLocationManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelected?: (location: Location) => void;
  currentUserLocation?: Location;
}

const UserLocationManager = ({
  isOpen,
  onClose,
  onLocationSelected,
  currentUserLocation
}: UserLocationManagerProps) => {
  const [userLocations, setUserLocations] = useState<Location[]>([]);
  const [isAddingLocation, setIsAddingLocation] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [newLocation, setNewLocation] = useState<Partial<Location>>({
    name: '',
    address: '',
    city: '',
    country: 'USA',
    type: 'home',
    isPublic: false
  });
  const [loading, setLoading] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      loadUserLocations();
    }
  }, [isOpen]);

  const loadUserLocations = () => {
    // Mock user locations - in real app, load from database
    const mockLocations: Location[] = [
      {
        id: '1',
        name: 'Home',
        address: '123 Main Street',
        city: 'New York',
        country: 'USA',
        type: 'home',
        latitude: 40.7128,
        longitude: -74.0060,
        isPublic: false,
        description: 'My home address'
      },
      {
        id: '2',
        name: 'Office',
        address: '456 Business Ave',
        city: 'New York',
        country: 'USA',
        type: 'work',
        latitude: 40.7580,
        longitude: -73.9855,
        isPublic: true,
        description: 'My workplace'
      },
      {
        id: '3',
        name: 'Favorite Cafe',
        address: '789 Coffee Street',
        city: 'New York',
        country: 'USA',
        type: 'cafe',
        latitude: 40.7505,
        longitude: -73.9934,
        isPublic: true,
        description: 'Great place for meetings'
      }
    ];
    setUserLocations(mockLocations);
  };

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'home': return <Home className="h-4 w-4" />;
      case 'work': return <Briefcase className="h-4 w-4" />;
      case 'cafe': return <Coffee className="h-4 w-4" />;
      case 'library': return <BookOpen className="h-4 w-4" />;
      case 'park': return <Trees className="h-4 w-4" />;
      case 'coworking': return <Building className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const getLocationTypeColor = (type: string) => {
    switch (type) {
      case 'home': return 'bg-red-100 text-red-700 border-red-200';
      case 'work': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'cafe': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'library': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'park': return 'bg-green-100 text-green-700 border-green-200';
      case 'coworking': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleDetectLocation = async () => {
    setDetecting(true);
    try {
      const currentLocation = await LocationService.getCurrentLocation();
      
      // Update new location with coordinates
      setNewLocation(prev => ({
        ...prev,
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        name: prev.name || 'Current Location',
        address: prev.address || 'Detected automatically',
        city: prev.city || 'Your City'
      }));

      toast({
        title: "Location Detected",
        description: "Your current location has been detected successfully",
      });
    } catch (error) {
      toast({
        title: "Location Error",
        description: "Unable to detect your location. Please enter manually.",
        variant: "destructive"
      });
    } finally {
      setDetecting(false);
    }
  };

  const handleSaveLocation = async () => {
    if (!newLocation.name || !newLocation.address || !newLocation.city) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Geocode if coordinates not available
      if (!newLocation.latitude || !newLocation.longitude) {
        const coordinates = await LocationService.geocodeAddress(
          `${newLocation.address}, ${newLocation.city}, ${newLocation.country}`
        );
        newLocation.latitude = coordinates.latitude;
        newLocation.longitude = coordinates.longitude;
      }

      const locationToSave: Location = {
        ...newLocation as Location,
        id: editingLocation?.id || `loc_${Date.now()}`,
        createdAt: editingLocation?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      if (editingLocation) {
        // Update existing location
        setUserLocations(prev => 
          prev.map(loc => loc.id === editingLocation.id ? locationToSave : loc)
        );
        toast({
          title: "Location Updated",
          description: `${locationToSave.name} has been updated`,
        });
      } else {
        // Add new location
        setUserLocations(prev => [...prev, locationToSave]);
        toast({
          title: "Location Added", 
          description: `${locationToSave.name} has been added to your locations`,
        });
      }

      // Reset form
      setNewLocation({
        name: '',
        address: '',
        city: '',
        country: 'USA',
        type: 'home',
        isPublic: false
      });
      setIsAddingLocation(false);
      setEditingLocation(null);

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save location. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditLocation = (location: Location) => {
    setEditingLocation(location);
    setNewLocation(location);
    setIsAddingLocation(true);
  };

  const handleDeleteLocation = (locationId: string) => {
    setUserLocations(prev => prev.filter(loc => loc.id !== locationId));
    toast({
      title: "Location Deleted",
      description: "Location has been removed from your list",
    });
  };

  const handleSelectLocation = (location: Location) => {
    onLocationSelected?.(location);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Manage Your Locations
          </DialogTitle>
          <DialogDescription>
            Add and manage your preferred meetup locations
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Add Location Button */}
          <Button 
            onClick={() => setIsAddingLocation(true)}
            className="w-full"
            variant="outline"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Location
          </Button>

          {/* Add/Edit Location Form */}
          {isAddingLocation && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {editingLocation ? 'Edit Location' : 'Add New Location'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="locationName">Location Name *</Label>
                    <Input
                      id="locationName"
                      placeholder="e.g., Home, Office, Favorite Cafe"
                      value={newLocation.name}
                      onChange={(e) => setNewLocation({...newLocation, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="locationType">Type</Label>
                    <Select 
                      value={newLocation.type} 
                      onValueChange={(value) => setNewLocation({...newLocation, type: value as any})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="home">Home</SelectItem>
                        <SelectItem value="work">Work</SelectItem>
                        <SelectItem value="cafe">Cafe</SelectItem>
                        <SelectItem value="library">Library</SelectItem>
                        <SelectItem value="coworking">Coworking Space</SelectItem>
                        <SelectItem value="park">Park</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    placeholder="Street address"
                    value={newLocation.address}
                    onChange={(e) => setNewLocation({...newLocation, address: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      placeholder="City"
                      value={newLocation.city}
                      onChange={(e) => setNewLocation({...newLocation, city: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      placeholder="Country"
                      value={newLocation.country}
                      onChange={(e) => setNewLocation({...newLocation, country: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={handleDetectLocation}
                    disabled={detecting}
                  >
                    {detecting ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Navigation className="h-4 w-4 mr-2" />
                    )}
                    Detect Current Location
                  </Button>
                  
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={newLocation.isPublic}
                      onChange={(e) => setNewLocation({...newLocation, isPublic: e.target.checked})}
                    />
                    Share for meetup suggestions
                  </label>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsAddingLocation(false);
                      setEditingLocation(null);
                      setNewLocation({
                        name: '',
                        address: '',
                        city: '',
                        country: 'USA',
                        type: 'home',
                        isPublic: false
                      });
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSaveLocation} 
                    disabled={loading}
                    className="flex-1"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <CheckCircle className="h-4 w-4 mr-2" />
                    )}
                    {editingLocation ? 'Update' : 'Save'} Location
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* User Locations List */}
          <div className="space-y-2">
            <h3 className="font-medium">Your Locations</h3>
            {userLocations.length === 0 ? (
              <Card>
                <CardContent className="flex items-center justify-center h-24">
                  <div className="text-center space-y-2">
                    <AlertCircle className="h-6 w-6 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">No locations added yet</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              userLocations.map((location) => (
                <Card 
                  key={location.id} 
                  className="cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => handleSelectLocation(location)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getLocationIcon(location.type)}
                          <h4 className="font-medium">{location.name}</h4>
                          <Badge className={getLocationTypeColor(location.type)}>
                            {location.type}
                          </Badge>
                          {!location.isPublic && (
                            <Badge variant="secondary">Private</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{location.address}, {location.city}</p>
                        {location.description && (
                          <p className="text-xs text-muted-foreground mt-1">{location.description}</p>
                        )}
                      </div>
                      <div className="flex gap-1 ml-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditLocation(location);
                          }}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteLocation(location.id!);
                          }}
                        >
                          <Trash className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          asChild
                          onClick={(e) => e.stopPropagation()}
                        >
                          <a 
                            href={LocationService.getMapUrl(location)} 
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserLocationManager;
