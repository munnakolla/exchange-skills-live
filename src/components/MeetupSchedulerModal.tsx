import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  MapPin, 
  Clock, 
  User, 
  Navigation,
  Coffee,
  BookOpen,
  Building,
  Trees,
  Home,
  Briefcase,
  ExternalLink,
  Calendar,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Location, LocationService, MeetupRequest } from "@/services/locationService";

interface MeetupSchedulerModalProps {
  isOpen: boolean;
  onClose: () => void;
  participantName: string;
  participantId: string;
  participantLocation?: Location;
  sessionTitle?: string;
  onMeetupScheduled?: (meetup: MeetupRequest) => void;
}

type Step = 'location' | 'time' | 'confirm';

const MeetupSchedulerModal = ({ 
  isOpen, 
  onClose, 
  participantName, 
  participantId,
  participantLocation,
  sessionTitle = "Learning Session",
  onMeetupScheduled
}: MeetupSchedulerModalProps) => {
  const [currentStep, setCurrentStep] = useState<Step>('location');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [customLocation, setCustomLocation] = useState<Partial<Location>>({
    name: '',
    address: '',
    city: '',
    district: '',
    state: '',
    country: 'India',
    type: 'cafe',
    isPublic: true
  });
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [suggestedLocations, setSuggestedLocations] = useState<Location[]>([]);
  const [popularLocations, setPopularLocations] = useState<Location[]>([]);
  const [userLocation, setUserLocation] = useState<{latitude: number; longitude: number} | null>(null);
  const [loading, setLoading] = useState(false);
  const [locationTab, setLocationTab] = useState<'suggested' | 'popular' | 'custom'>('suggested');
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      loadLocationData();
    }
  }, [isOpen]);

  const loadLocationData = async () => {
    setLoading(true);
    try {
      // Get user's current location
      const currentLocation = await LocationService.getCurrentLocation();
      setUserLocation(currentLocation);

      // If participant has a location, find midpoint suggestions
      if (participantLocation && participantLocation.latitude && participantLocation.longitude) {
        const suggestions = await LocationService.findMidpointLocations(
          currentLocation,
          { 
            latitude: participantLocation.latitude, 
            longitude: participantLocation.longitude 
          }
        );
        setSuggestedLocations(suggestions);
      }

      // Load popular locations for the user's city
      const popular = await LocationService.getPopularLocations("Your City");
      setPopularLocations(popular);

    } catch (error) {
      console.error('Error loading location data:', error);
      toast({
        title: "Location Access",
        description: "Unable to access your location. You can still select a meetup location manually.",
        variant: "destructive"
      });
      
      // Load default popular locations
      const popular = await LocationService.getPopularLocations("Default City");
      setPopularLocations(popular);
    } finally {
      setLoading(false);
    }
  };

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'cafe': return <Coffee className="h-4 w-4" />;
      case 'library': return <BookOpen className="h-4 w-4" />;
      case 'coworking': return <Building className="h-4 w-4" />;
      case 'park': return <Trees className="h-4 w-4" />;
      case 'home': return <Home className="h-4 w-4" />;
      case 'work': return <Briefcase className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const getLocationTypeColor = (type: string) => {
    switch (type) {
      case 'cafe': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'library': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'coworking': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'park': return 'bg-green-100 text-green-700 border-green-200';
      case 'home': return 'bg-red-100 text-red-700 border-red-200';
      case 'work': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setCurrentStep('time');
  };

  const handleCustomLocationSubmit = async () => {
    if (!customLocation.name || !customLocation.address || !customLocation.city) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required location fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Geocode the custom location with enhanced address format (supports international and district precision)
      const addressParts = [
        customLocation.address,
        customLocation.district,
        customLocation.city,
        customLocation.state || '',
        customLocation.country
      ].filter(part => part && part.trim() !== '');
      
      const fullAddress = addressParts.join(', ');
      
      const coordinates = await LocationService.geocodeAddress(fullAddress);

      const newLocation: Location = {
        ...customLocation as Location,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
      };

      setSelectedLocation(newLocation);
      setCurrentStep('time');
    } catch (error) {
      toast({
        title: "Location Error",
        description: "Could not find the specified location. Please check the address and try again.",
        variant: "destructive"
      });
    }
  };

  const handleScheduleMeetup = async () => {
    if (!selectedLocation || !selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select a location, date, and time.",
        variant: "destructive"
      });
      return;
    }

    const meetupRequest: MeetupRequest = {
      sessionId: `session_${Date.now()}`,
      requesterId: 'current_user_id', // Replace with actual user ID
      recipientId: participantId,
      proposedLocation: selectedLocation,
      message: message,
      proposedTime: `${selectedDate}T${selectedTime}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    try {
      // Here you would typically save to your database
      console.log('Scheduling meetup:', meetupRequest);
      
      onMeetupScheduled?.(meetupRequest);
      
      toast({
        title: "Meetup Scheduled!",
        description: `Meetup request sent to ${participantName}`,
      });

      onClose();
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule meetup. Please try again.",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setCurrentStep('location');
    setSelectedLocation(null);
    setCustomLocation({
      name: '',
      address: '',
      city: '',
      district: '',
      state: '',
      country: 'India',
      type: 'cafe',
      isPublic: true
    });
    setSelectedDate('');
    setSelectedTime('');
    setMessage('');
    setLocationTab('suggested');
  };

  const renderLocationStep = () => (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Choose Meetup Location</h3>
        <p className="text-sm text-muted-foreground">
          Select a convenient location for both you and {participantName}
        </p>
      </div>

      <Tabs value={locationTab} onValueChange={(value) => setLocationTab(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="suggested">Suggested</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
        </TabsList>

        <TabsContent value="suggested" className="space-y-3">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="ml-2">Finding optimal locations...</span>
            </div>
          ) : suggestedLocations.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Locations between you and {participantName}:
              </p>
              {suggestedLocations.map((location, index) => (
                <Card 
                  key={index} 
                  className="cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => handleLocationSelect(location)}
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
                        </div>
                        <p className="text-sm text-muted-foreground">{location.address}</p>
                        {location.description && (
                          <p className="text-xs text-muted-foreground mt-1">{location.description}</p>
                        )}
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No suggested locations available. Try popular locations or add a custom one.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="popular" className="space-y-2">
          {popularLocations.map((location, index) => (
            <Card 
              key={index} 
              className="cursor-pointer hover:bg-muted transition-colors"
              onClick={() => handleLocationSelect(location)}
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
                    </div>
                    <p className="text-sm text-muted-foreground">{location.address}</p>
                    {location.description && (
                      <p className="text-xs text-muted-foreground mt-1">{location.description}</p>
                    )}
                  </div>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="locationName">Location Name *</Label>
              <Input
                id="locationName"
                placeholder="e.g., Central Coffee"
                value={customLocation.name}
                onChange={(e) => setCustomLocation({...customLocation, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="locationType">Type</Label>
              <Select value={customLocation.type} onValueChange={(value) => setCustomLocation({...customLocation, type: value as any})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
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
              placeholder="Street address, Area"
              value={customLocation.address}
              onChange={(e) => setCustomLocation({...customLocation, address: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                placeholder="e.g., Mumbai"
                value={customLocation.city}
                onChange={(e) => setCustomLocation({...customLocation, city: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              <Input
                id="district"
                placeholder="e.g., Mumbai City"
                value={customLocation.district}
                onChange={(e) => setCustomLocation({...customLocation, district: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                placeholder="e.g., Maharashtra"
                value={customLocation.state}
                onChange={(e) => setCustomLocation({...customLocation, state: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select value={customLocation.country} onValueChange={(value) => setCustomLocation({...customLocation, country: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="India">🇮🇳 India</SelectItem>
                  <SelectItem value="United States">🇺🇸 United States</SelectItem>
                  <SelectItem value="United Kingdom">🇬🇧 United Kingdom</SelectItem>
                  <SelectItem value="Canada">🇨🇦 Canada</SelectItem>
                  <SelectItem value="Australia">🇦🇺 Australia</SelectItem>
                  <SelectItem value="Singapore">🇸🇬 Singapore</SelectItem>
                  <SelectItem value="Germany">🇩🇪 Germany</SelectItem>
                  <SelectItem value="France">🇫🇷 France</SelectItem>
                  <SelectItem value="Japan">🇯🇵 Japan</SelectItem>
                  <SelectItem value="China">🇨🇳 China</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Additional details about the location..."
              value={customLocation.description}
              onChange={(e) => setCustomLocation({...customLocation, description: e.target.value})}
            />
          </div>

          <Button onClick={handleCustomLocationSubmit} className="w-full">
            <MapPin className="h-4 w-4 mr-2" />
            Use This Location
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderTimeStep = () => (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Schedule Your Meetup</h3>
        <p className="text-sm text-muted-foreground">
          When would you like to meet at {selectedLocation?.name}?
        </p>
      </div>

      {selectedLocation && (
        <Card className="bg-muted">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              {getLocationIcon(selectedLocation.type)}
              <div className="flex-1">
                <h4 className="font-medium">{selectedLocation.name}</h4>
                <p className="text-sm text-muted-foreground">{selectedLocation.address}</p>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href={LocationService.getMapUrl(selectedLocation)} target="_blank">
                      <Navigation className="h-3 w-3 mr-1" />
                      View Map
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date *</Label>
          <Input
            id="date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">Time *</Label>
          <Input
            id="time"
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message to {participantName} (Optional)</Label>
        <Textarea
          id="message"
          placeholder={`Hi ${participantName}, would you like to meet for our ${sessionTitle}?`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setCurrentStep('location')} className="flex-1">
          Back
        </Button>
        <Button onClick={() => setCurrentStep('confirm')} className="flex-1">
          <Calendar className="h-4 w-4 mr-2" />
          Review & Send
        </Button>
      </div>
    </div>
  );

  const renderConfirmStep = () => (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Confirm Meetup Request</h3>
        <p className="text-sm text-muted-foreground">
          Review your meetup details before sending to {participantName}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Meetup Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            {selectedLocation && getLocationIcon(selectedLocation.type)}
            <div className="flex-1">
              <h4 className="font-medium">{selectedLocation?.name}</h4>
              <p className="text-sm text-muted-foreground">{selectedLocation?.address}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4" />
            <div>
              <p className="font-medium">
                {new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p className="text-sm text-muted-foreground">
                {new Date(`2000-01-01T${selectedTime}`).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                })}
              </p>
            </div>
          </div>

          {message && (
            <div className="flex items-start gap-3">
              <MessageCircle className="h-4 w-4 mt-0.5" />
              <div>
                <p className="font-medium">Your Message</p>
                <p className="text-sm text-muted-foreground">{message}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setCurrentStep('time')} className="flex-1">
          Back
        </Button>
        <Button onClick={handleScheduleMeetup} className="flex-1">
          <CheckCircle className="h-4 w-4 mr-2" />
          Send Request
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Schedule Meetup with {participantName}
          </DialogTitle>
          <DialogDescription>
            Plan an in-person meeting for your {sessionTitle}
          </DialogDescription>
        </DialogHeader>
        
        {currentStep === 'location' && renderLocationStep()}
        {currentStep === 'time' && renderTimeStep()}
        {currentStep === 'confirm' && renderConfirmStep()}
      </DialogContent>
    </Dialog>
  );
};

export default MeetupSchedulerModal;
