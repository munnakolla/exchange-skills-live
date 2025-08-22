import { useState } from "react";
import { Search, Filter, MapPin, Star, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";

const FindPartnersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  // Mock data for learning partners
  const mockPartners = [
    {
      id: '1',
      name: 'Sarah Johnson',
      location: 'New York, NY',
      avatar_url: '',
      rating: 4.9,
      skills: [
        { name: 'JavaScript', level: 'expert', teaching: true },
        { name: 'React', level: 'expert', teaching: true },
        { name: 'Python', level: 'intermediate', teaching: false },
      ],
      bio: 'Full-stack developer with 5+ years experience. Love teaching JavaScript and React.',
      availableSlots: 8,
      responseTime: '2 hours',
      experience: '5+ years'
    },
    {
      id: '2',
      name: 'Mike Rodriguez',
      location: 'Los Angeles, CA',
      avatar_url: '',
      rating: 4.8,
      skills: [
        { name: 'Guitar', level: 'expert', teaching: true },
        { name: 'Music Theory', level: 'advanced', teaching: true },
        { name: 'Piano', level: 'beginner', teaching: false },
      ],
      bio: 'Professional musician and guitar instructor. Teaching for 10+ years.',
      availableSlots: 12,
      responseTime: '1 hour',
      experience: '10+ years'
    },
    {
      id: '3',
      name: 'Maria Garcia',
      location: 'Miami, FL',
      avatar_url: '',
      rating: 5.0,
      skills: [
        { name: 'Spanish', level: 'native', teaching: true },
        { name: 'Portuguese', level: 'fluent', teaching: true },
        { name: 'French', level: 'intermediate', teaching: false },
      ],
      bio: 'Native Spanish speaker with language teaching certification.',
      availableSlots: 15,
      responseTime: '30 minutes',
      experience: 'Native speaker'
    }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "programming", label: "Programming" },
    { value: "design", label: "Design" },
    { value: "music", label: "Music" },
    { value: "languages", label: "Languages" },
    { value: "academic", label: "Academic" },
    { value: "business", label: "Business" }
  ];

  const levels = [
    { value: "all", label: "All Levels" },
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
    { value: "expert", label: "Expert" }
  ];

  const filteredPartners = mockPartners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         partner.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         partner.skills.some(skill => skill.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || 
                           partner.skills.some(skill => 
                             skill.name.toLowerCase().includes(selectedCategory.toLowerCase())
                           );
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Find Learning Partners</h1>
              <p className="text-muted-foreground">Connect with skilled individuals for knowledge exchange and skill sharing</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, skills, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              {filteredPartners.length} Learning Partners Available
            </h2>
          </div>

          {/* Partners Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPartners.map((partner) => (
              <Card key={partner.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={partner.avatar_url} alt={partner.name} />
                        <AvatarFallback>
                          {partner.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{partner.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {partner.location}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{partner.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {partner.bio}
                  </p>

                  {/* Skills */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Teaching Skills:</h4>
                    <div className="flex flex-wrap gap-1">
                      {partner.skills
                        .filter(skill => skill.teaching)
                        .map((skill) => (
                          <Badge key={skill.name} variant="secondary" className="text-xs">
                            {skill.name} ({skill.level})
                          </Badge>
                        ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div>
                      <div className="font-medium">{partner.experience}</div>
                      <div className="text-muted-foreground">Experience</div>
                    </div>
                    <div>
                      <div className="font-medium">{partner.availableSlots}</div>
                      <div className="text-muted-foreground">Slots</div>
                    </div>
                    <div>
                      <div className="font-medium">{partner.responseTime}</div>
                      <div className="text-muted-foreground">Response</div>
                    </div>
                  </div>

                  {/* Action */}
                  <Button className="w-full" size="sm">
                    Connect & Learn
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredPartners.length === 0 && (
            <Card className="p-12 text-center">
              <div className="space-y-4">
                <Search className="h-12 w-12 text-muted-foreground mx-auto" />
                <h3 className="text-xl font-semibold">No partners found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or filters to find more results
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setSelectedLevel("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindPartnersPage;
