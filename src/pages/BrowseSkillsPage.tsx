import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Search, 
  TrendingUp, 
  Star, 
  Users, 
  Clock,
  BookOpen,
  Code,
  Palette,
  Music,
  Heart,
  Briefcase,
  Globe,
  Zap
} from "lucide-react";

const BrowseSkillsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "all", name: "All Skills", icon: Globe },
    { id: "technology", name: "Technology", icon: Code },
    { id: "creative", name: "Creative Arts", icon: Palette },
    { id: "music", name: "Music", icon: Music },
    { id: "health", name: "Health & Wellness", icon: Heart },
    { id: "business", name: "Business", icon: Briefcase },
    { id: "academic", name: "Academic", icon: BookOpen },
  ];

  const popularSkills = [
    {
      id: 1,
      name: "JavaScript Programming",
      category: "Technology",
      learners: 2840,
      teachers: 156,
      rating: 4.8,
      description: "Learn modern JavaScript, ES6+, and popular frameworks",
      tags: ["Web Development", "Programming", "Frontend"],
      difficulty: "Beginner to Advanced",
      trending: true
    },
    {
      id: 2,
      name: "Digital Marketing",
      category: "Business",
      learners: 1950,
      teachers: 89,
      rating: 4.7,
      description: "Master social media, SEO, and online advertising strategies",
      tags: ["Marketing", "Social Media", "SEO"],
      difficulty: "Beginner",
      trending: true
    },
    {
      id: 3,
      name: "Graphic Design",
      category: "Creative Arts",
      learners: 1680,
      teachers: 112,
      rating: 4.9,
      description: "Create stunning visuals using industry-standard tools",
      tags: ["Design", "Adobe", "Creativity"],
      difficulty: "Intermediate",
      trending: false
    },
    {
      id: 4,
      name: "Spanish Language",
      category: "Academic",
      learners: 2200,
      teachers: 203,
      rating: 4.6,
      description: "Conversational Spanish for travel and business",
      tags: ["Language", "Communication", "Culture"],
      difficulty: "Beginner to Advanced",
      trending: true
    },
    {
      id: 5,
      name: "Photography",
      category: "Creative Arts",
      learners: 1420,
      teachers: 78,
      rating: 4.8,
      description: "From basics to professional photography techniques",
      tags: ["Photography", "Art", "Visual"],
      difficulty: "Beginner",
      trending: false
    },
    {
      id: 6,
      name: "Data Science",
      category: "Technology",
      learners: 1870,
      teachers: 134,
      rating: 4.9,
      description: "Python, machine learning, and data analysis",
      tags: ["Data", "Python", "Analytics"],
      difficulty: "Advanced",
      trending: true
    },
    {
      id: 7,
      name: "Guitar Playing",
      category: "Music",
      learners: 1650,
      teachers: 145,
      rating: 4.7,
      description: "Acoustic and electric guitar for all levels",
      tags: ["Music", "Instrument", "Creative"],
      difficulty: "Beginner to Advanced",
      trending: false
    },
    {
      id: 8,
      name: "Yoga & Meditation",
      category: "Health & Wellness",
      learners: 1980,
      teachers: 167,
      rating: 4.8,
      description: "Mind-body wellness and stress management",
      tags: ["Health", "Wellness", "Mindfulness"],
      difficulty: "Beginner",
      trending: true
    }
  ];

  const filteredSkills = popularSkills.filter(skill =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    skill.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    skill.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const trendingSkills = popularSkills.filter(skill => skill.trending);

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty.includes("Beginner")) return "bg-green-100 text-green-800";
    if (difficulty.includes("Intermediate")) return "bg-yellow-100 text-yellow-800";
    if (difficulty.includes("Advanced")) return "bg-red-100 text-red-800";
    return "bg-blue-100 text-blue-800";
  };

  const SkillCard = ({ skill }: { skill: typeof popularSkills[0] }) => (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {skill.name}
              {skill.trending && <TrendingUp className="h-4 w-4 text-orange-500" />}
            </CardTitle>
            <CardDescription className="mt-1">
              {skill.description}
            </CardDescription>
          </div>
          <Badge variant="secondary" className={getDifficultyColor(skill.difficulty)}>
            {skill.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {skill.learners} learners
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                {skill.teachers} teachers
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              {skill.rating}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {skill.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button size="sm" className="flex-1">
              Learn This Skill
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              Find Teachers
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Browse Popular Skills</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover trending skills and connect with expert teachers in our community
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search skills, categories, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center p-4">
              <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <h3 className="font-semibold text-lg">{popularSkills.length}+</h3>
              <p className="text-sm text-muted-foreground">Popular Skills</p>
            </Card>
            <Card className="text-center p-4">
              <Users className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <h3 className="font-semibold text-lg">
                {popularSkills.reduce((sum, skill) => sum + skill.learners, 0).toLocaleString()}+
              </h3>
              <p className="text-sm text-muted-foreground">Active Learners</p>
            </Card>
            <Card className="text-center p-4">
              <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
              <h3 className="font-semibold text-lg">
                {popularSkills.reduce((sum, skill) => sum + skill.teachers, 0)}+
              </h3>
              <p className="text-sm text-muted-foreground">Expert Teachers</p>
            </Card>
            <Card className="text-center p-4">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-orange-500" />
              <h3 className="font-semibold text-lg">{trendingSkills.length}</h3>
              <p className="text-sm text-muted-foreground">Trending Now</p>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-7 mb-8">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                    <IconComponent className="h-4 w-4" />
                    <span className="hidden sm:inline">{category.name}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">All Popular Skills</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Zap className="h-4 w-4" />
                  {filteredSkills.length} skills found
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSkills.map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            </TabsContent>

            {categories.slice(1).map((category) => (
              <TabsContent key={category.id} value={category.id} className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">{category.name} Skills</h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Zap className="h-4 w-4" />
                    {filteredSkills.filter(skill => skill.category === category.name).length} skills found
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSkills
                    .filter(skill => skill.category === category.name)
                    .map((skill) => (
                      <SkillCard key={skill.id} skill={skill} />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Trending Section */}
          <div className="mt-12">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-6 w-6 text-orange-500" />
              <h2 className="text-2xl font-semibold">Trending This Week</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {trendingSkills.map((skill) => (
                <Card key={skill.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <h3 className="font-semibold mb-2">{skill.name}</h3>
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {skill.learners}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {skill.rating}
                      </span>
                    </div>
                    <Button size="sm" className="mt-3 w-full">
                      Explore
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BrowseSkillsPage;
