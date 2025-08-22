import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { useToast } from '../hooks/use-toast';
import { Search, BookOpen, Users, MapPin, Star, Clock, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

interface SkillWithProfile {
  id: string;
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  is_teaching: boolean;
  is_learning: boolean;
  user_id: string;
  profiles: {
    id: string;
    full_name: string;
    location: string;
    bio?: string;
    avatar_url?: string;
  };
}

const SKILL_CATEGORIES = [
  'All', 'Programming', 'Design', 'Languages', 'Music', 'Art', 'Sports', 
  'Cooking', 'Writing', 'Photography', 'Business', 'Other'
];

const SKILL_LEVELS = ['All', 'beginner', 'intermediate', 'advanced', 'expert'];

export default function Skills() {
  const { user, supabase } = useAuth();
  const { toast } = useToast();
  const [skills, setSkills] = useState<SkillWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [teachingOnly, setTeachingOnly] = useState(false);

  useEffect(() => {
    loadSkills();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadSkills = async () => {
    if (!supabase) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('skills')
        .select(`
          *,
          profiles (
            id,
            full_name,
            location,
            bio,
            avatar_url
          )
        `)
        .neq('user_id', user?.id) // Don't show current user's skills
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSkills(data || []);
    } catch (error) {
      console.error('Error loading skills:', error);
      toast({
        title: 'Error',
        description: 'Failed to load skills',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredSkills = skills.filter(skill => {
    // Search filter
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         skill.profiles.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         skill.profiles.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    
    // Level filter
    const matchesLevel = selectedLevel === 'All' || skill.level === selectedLevel;
    
    // Teaching filter
    const matchesTeaching = !teachingOnly || skill.is_teaching;
    
    return matchesSearch && matchesCategory && matchesLevel && matchesTeaching;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleContactUser = (skill: SkillWithProfile) => {
    // Redirect to messages page with a toast notification
    toast({
      title: 'Contact Feature',
      description: `Redirecting to messages to chat with ${skill.profiles.full_name}`,
    });
    // In a real implementation, this would open a direct message
    window.location.href = '/messages';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Browse Skills</h1>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Find Skills to Learn</CardTitle>
            <CardDescription>
              Search for skills you want to learn from our community members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search skills or people..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {SKILL_CATEGORIES.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  {SKILL_LEVELS.map(level => (
                    <SelectItem key={level} value={level}>
                      {level === 'All' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="teaching-only"
                  checked={teachingOnly}
                  onChange={(e) => setTeachingOnly(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="teaching-only" className="text-sm font-medium">
                  Teaching only
                </label>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{filteredSkills.length} skills found</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-40"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredSkills.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <BookOpen className="h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No skills found</h3>
              <p className="text-gray-600 text-center max-w-md">
                {searchQuery || selectedCategory !== 'All' || selectedLevel !== 'All' 
                  ? 'Try adjusting your search filters to find more skills.'
                  : 'No skills are available yet. Be the first to add your skills!'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill) => (
              <Card key={skill.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  {/* User Info */}
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={skill.profiles.avatar_url} alt={skill.profiles.full_name} />
                      <AvatarFallback>
                        {skill.profiles.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-lg">{skill.profiles.full_name}</h4>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{skill.profiles.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Skill Info */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">{skill.name}</h3>
                      <Badge className={getLevelColor(skill.level)}>
                        {skill.level}
                      </Badge>
                    </div>
                    
                    <Badge variant="secondary">{skill.category}</Badge>
                    
                    {skill.profiles.bio && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {skill.profiles.bio}
                      </p>
                    )}

                    <div className="flex gap-2 text-sm">
                      {skill.is_teaching && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <BookOpen className="w-3 h-3 mr-1" />
                          Teaching
                        </Badge>
                      )}
                      {skill.is_learning && (
                        <Badge variant="outline" className="text-blue-600 border-blue-600">
                          <Star className="w-3 h-3 mr-1" />
                          Learning
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleContactUser(skill)}
                        disabled={!skill.is_teaching}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        {skill.is_teaching ? 'Contact' : 'Not Teaching'}
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link to="/sessions">
                          <Clock className="w-4 h-4 mr-2" />
                          Schedule
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
