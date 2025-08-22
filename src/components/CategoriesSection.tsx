import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Search, Star, MapPin, Clock, Users } from "lucide-react";
import { useState } from "react";

const categories = [
  {
    title: "Technology",
    skills: ["Web Development", "Mobile Apps", "Data Science", "AI/ML", "Cybersecurity"],
    icon: "💻",
    color: "from-blue-500 to-purple-600",
    count: "120+ skills",
    teachers: [
      { name: "Alex Chen", skill: "React Development", rating: 4.9, sessions: 45, location: "San Francisco" },
      { name: "Sarah Kim", skill: "Python/AI", rating: 4.8, sessions: 32, location: "Seattle" },
      { name: "Marcus Johnson", skill: "Mobile Apps", rating: 4.7, sessions: 28, location: "Austin" }
    ]
  },
  {
    title: "Creative Arts",
    skills: ["Digital Art", "Photography", "Music Production", "Writing", "Video Editing"],
    icon: "🎨",
    color: "from-pink-500 to-orange-500",
    count: "85+ skills",
    teachers: [
      { name: "Emma Rodriguez", skill: "Digital Photography", rating: 5.0, sessions: 67, location: "Los Angeles" },
      { name: "David Park", skill: "Music Production", rating: 4.8, sessions: 23, location: "Nashville" },
      { name: "Luna Martinez", skill: "Video Editing", rating: 4.9, sessions: 41, location: "Miami" }
    ]
  },
  {
    title: "Languages",
    skills: ["English", "Spanish", "French", "Japanese", "Sign Language"],
    icon: "🌍",
    color: "from-green-500 to-teal-500",
    count: "50+ languages",
    teachers: [
      { name: "Marie Dubois", skill: "French Language", rating: 4.9, sessions: 89, location: "Montreal" },
      { name: "Hiroshi Tanaka", skill: "Japanese", rating: 4.8, sessions: 56, location: "Tokyo" },
      { name: "Isabella Garcia", skill: "Spanish", rating: 5.0, sessions: 73, location: "Barcelona" }
    ]
  },
  {
    title: "Business",
    skills: ["Marketing", "Finance", "Leadership", "Project Management", "Sales"],
    icon: "💼",
    color: "from-yellow-500 to-red-500",
    count: "75+ skills",
    teachers: [
      { name: "Robert Wilson", skill: "Digital Marketing", rating: 4.7, sessions: 34, location: "New York" },
      { name: "Jennifer Lee", skill: "Project Management", rating: 4.9, sessions: 52, location: "Chicago" },
      { name: "Michael Brown", skill: "Finance", rating: 4.6, sessions: 29, location: "Boston" }
    ]
  },
  {
    title: "Life Skills",
    skills: ["Cooking", "Fitness", "Meditation", "Gardening", "Home Repair"],
    icon: "🏠",
    color: "from-indigo-500 to-purple-500",
    count: "90+ skills",
    teachers: [
      { name: "Chef Antonio", skill: "Italian Cooking", rating: 4.9, sessions: 78, location: "Portland" },
      { name: "Yoga Lisa", skill: "Meditation", rating: 5.0, sessions: 156, location: "Boulder" },
      { name: "Handy Pete", skill: "Home Repair", rating: 4.8, sessions: 43, location: "Denver" }
    ]
  },
  {
    title: "Academic",
    skills: ["Mathematics", "Science", "History", "Literature", "Tutoring"],
    icon: "📚",
    color: "from-emerald-500 to-blue-500",
    count: "60+ subjects",
    teachers: [
      { name: "Dr. Smith", skill: "Physics", rating: 4.8, sessions: 91, location: "Cambridge" },
      { name: "Prof. Johnson", skill: "Literature", rating: 4.9, sessions: 64, location: "Oxford" },
      { name: "Ms. Chang", skill: "Mathematics", rating: 4.7, sessions: 105, location: "Stanford" }
    ]
  }
];

const CategoriesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTeachers = selectedCategory ? 
    selectedCategory.teachers.filter(teacher => 
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.skill.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.location.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

  return (
    <section id="categories" className="py-12 sm:py-16 lg:py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6">
            Explore <span className="gradient-text">Skill Categories</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4 sm:px-0">
            Discover a diverse range of skills across multiple categories. 
            From technical expertise to creative pursuits, find your perfect learning match.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 lg:mb-12">
          {categories.map((category, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Card 
                  className="p-4 sm:p-6 lg:p-8 border-card-border hover:shadow-strong transition-all duration-300 skill-card-hover group relative overflow-hidden cursor-pointer touch-target"
                  onClick={() => setSelectedCategory(category)}
                >
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                  
                  <div className="relative space-y-4 sm:space-y-6">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${category.color} rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-medium group-hover:scale-110 transition-transform duration-300`}>
                        {category.icon}
                      </div>
                      <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                        {category.count}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 group-hover:text-primary transition-colors">
                        {category.title}
                      </h3>
                      <div className="space-y-2">
                        {category.skills.map((skill, skillIndex) => (
                          <div 
                            key={skillIndex}
                            className="inline-block bg-muted px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-muted-foreground mr-1 sm:mr-2 mb-1 sm:mb-2 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer touch-target"
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full text-sm sm:text-base group-hover:border-primary group-hover:text-primary"
                    >
                      Browse Teachers ({category.teachers.length})
                    </Button>
                  </div>
                </Card>
              </DialogTrigger>
              
              <DialogContent className="max-w-[95vw] sm:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto m-4">
                <DialogHeader className="space-y-3 sm:space-y-4">
                  <DialogTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl lg:text-2xl">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br ${category.color} rounded-xl sm:rounded-2xl flex items-center justify-center text-base sm:text-lg lg:text-xl`}>
                      {category.icon}
                    </div>
                    {category.title} Teachers
                  </DialogTitle>
                  <DialogDescription className="text-sm sm:text-base">
                    Find experienced teachers in {category.title.toLowerCase()} skills near you
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 sm:space-y-6">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      placeholder="Search teachers by name, skill, or location..." 
                      className="pl-10 text-sm sm:text-base"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  {/* Teachers List */}
                  <div className="grid gap-3 sm:gap-4">
                    {filteredTeachers.map((teacher, teacherIndex) => (
                      <Card key={teacherIndex} className="p-3 sm:p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                            <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm sm:text-base">
                                {teacher.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-1">
                              <h4 className="font-semibold text-sm sm:text-base truncate">{teacher.name}</h4>
                              <p className="text-xs sm:text-sm text-gray-600 truncate">{teacher.skill}</p>
                              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-500 mt-1">
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 text-yellow-500" />
                                  {teacher.rating}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {teacher.sessions} sessions
                                </div>
                                <div className="flex items-center gap-1 min-w-0">
                                  <MapPin className="h-3 w-3 flex-shrink-0" />
                                  <span className="truncate">{teacher.location}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-row sm:flex-col gap-2 self-end sm:self-center">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm flex-1 sm:flex-none">
                              Message
                            </Button>
                            <Badge variant="outline" className="text-xs whitespace-nowrap">
                              Available
                            </Badge>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="text-center pt-2 sm:pt-4">
                    <Button variant="outline" className="w-full text-sm sm:text-base">
                      <Link to="/get-started" className="flex items-center gap-2">
                        View All {category.title} Teachers
                      </Link>
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base px-4 sm:px-0">
            Don't see your skill? No problem! Our platform supports any skill you can imagine.
          </p>
          <Button variant="hero" size="lg" asChild className="w-full sm:w-auto">
            <Link to="/get-started">Suggest a New Category</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;