import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { useToast } from '../hooks/use-toast';
import { Plus, X, User, BookOpen, Award, Camera, Upload, MapPin, Mail, Calendar } from 'lucide-react';
import Header from '../components/Header';
import ProfileBadgeDisplay from '../components/ProfileBadgeDisplay';

interface Skill {
  id: string;
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  is_teaching: boolean;
  is_learning: boolean;
}

const SKILL_CATEGORIES = [
  'Programming', 'Design', 'Languages', 'Music', 'Art', 'Sports', 
  'Cooking', 'Writing', 'Photography', 'Business', 'Other'
];

const SKILL_LEVELS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'expert', label: 'Expert' }
];

export default function Profile() {
  const { user, profile, updateProfile, supabase } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillsLoading, setSkillsLoading] = useState(true);
  
  // Profile form state
  const [profileForm, setProfileForm] = useState({
    full_name: profile?.full_name || '',
    location: profile?.location || '',
    bio: profile?.bio || ''
  });

  // New skill form state
  const [newSkill, setNewSkill] = useState({
    name: '',
    category: '',
    level: 'beginner' as 'beginner' | 'intermediate' | 'advanced' | 'expert',
    is_teaching: false,
    is_learning: false
  });
  const [showSkillForm, setShowSkillForm] = useState(false);

  useEffect(() => {
    if (profile) {
      setProfileForm({
        full_name: profile.full_name || '',
        location: profile.location || '',
        bio: profile.bio || ''
      });
    }
  }, [profile]);

  useEffect(() => {
    if (user) {
      loadSkills();
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadSkills = async () => {
    if (!user || !supabase) return;
    
    try {
      setSkillsLoading(true);
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('user_id', user.id)
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
      setSkillsLoading(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile(profileForm);
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user || !supabase) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'Please select an image file',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Error',
        description: 'Image size should be less than 5MB',
        variant: 'destructive',
      });
      return;
    }

    setUploadingAvatar(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update profile with new avatar URL
      await updateProfile({ avatar_url: data.publicUrl });

      toast({
        title: 'Success',
        description: 'Profile picture updated successfully',
      });
    } catch (error: unknown) {
      console.error('Error uploading avatar:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload profile picture';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !supabase) return;

    if (!newSkill.name.trim() || !newSkill.category) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    if (!newSkill.is_teaching && !newSkill.is_learning) {
      toast({
        title: 'Error',
        description: 'Please select if you want to teach or learn this skill',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('skills')
        .insert([{
          user_id: user.id,
          name: newSkill.name.trim(),
          category: newSkill.category,
          level: newSkill.level,
          is_teaching: newSkill.is_teaching,
          is_learning: newSkill.is_learning
        }]);

      if (error) throw error;

      setNewSkill({
        name: '',
        category: '',
        level: 'beginner',
        is_teaching: false,
        is_learning: false
      });
      setShowSkillForm(false);
      loadSkills();
      
      toast({
        title: 'Success',
        description: 'Skill added successfully',
      });
    } catch (error) {
      console.error('Error adding skill:', error);
      toast({
        title: 'Error',
        description: 'Failed to add skill',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteSkill = async (skillId: string) => {
    if (!supabase) return;

    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', skillId);

      if (error) throw error;

      loadSkills();
      toast({
        title: 'Success',
        description: 'Skill deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting skill:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete skill',
        variant: 'destructive',
      });
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="flex items-center justify-center h-32">
            <p>Please sign in to view your profile.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 pt-20 sm:pt-24 space-y-6 sm:space-y-8">
        <div className="flex items-center gap-2 sm:gap-3">
          <User className="h-6 w-6 sm:h-8 sm:w-8" />
          <h1 className="text-2xl sm:text-3xl font-bold">My Profile</h1>
        </div>

        {/* Profile Header Card */}
        <Card>
          <CardContent className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
              {/* Avatar Section */}
              <div className="flex flex-col items-center space-y-3 sm:space-y-4 w-full lg:w-auto">
                <div className="relative">
                  <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
                    <AvatarImage src={profile?.avatar_url} alt={profile?.full_name} />
                    <AvatarFallback className="text-lg sm:text-2xl">
                      {profile?.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute bottom-0 right-0 rounded-full h-8 w-8 sm:h-10 sm:w-10 p-0"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingAvatar}
                  >
                    {uploadingAvatar ? (
                      <div className="h-3 w-3 sm:h-4 sm:w-4 animate-spin rounded-full border-2 border-background border-t-foreground"></div>
                    ) : (
                      <Camera className="h-3 w-3 sm:h-4 sm:w-4" />
                    )}
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </div>
                <div className="text-center w-full">
                  <h2 className="text-xl sm:text-2xl font-bold">{profile?.full_name || 'User'}</h2>
                  <div className="flex items-center justify-center gap-1 text-gray-600 mt-1 text-sm">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="truncate">{profile?.location || 'Location not set'}</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-gray-600 mt-1 text-sm">
                    <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="truncate">{user?.email}</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-gray-600 mt-1 text-sm">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="truncate">Joined {new Date(profile?.created_at || '').toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex-1 grid grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 w-full">
                <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600">{skills.length}</div>
                  <div className="text-xs sm:text-sm text-gray-600">Total Skills</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-green-50 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-green-600">
                    {skills.filter(s => s.is_teaching).length}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">Teaching</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-purple-50 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-purple-600">
                    {skills.filter(s => s.is_learning).length}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">Learning</div>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            {profile?.bio && (
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2 text-sm sm:text-base">About Me</h3>
                <p className="text-gray-700 text-sm sm:text-base">{profile.bio}</p>
              </div>
            )}
          </CardContent>
        </Card>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={user.email || ''}
                  disabled
                  className="bg-gray-50"
                />
              </div>
              <div>
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={profileForm.full_name}
                  onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={profileForm.location}
                  onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profileForm.bio}
                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                placeholder="Tell others about yourself..."
                rows={3}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Skills Management */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                My Skills
              </CardTitle>
              <CardDescription className="text-sm">Manage skills you can teach or want to learn</CardDescription>
            </div>
            <Button 
              onClick={() => setShowSkillForm(true)} 
              className="flex items-center gap-2 text-sm self-start sm:self-auto"
              size="sm"
            >
              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
              Add Skill
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Add Skill Form */}
          {showSkillForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Add New Skill</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddSkill} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="skill_name">Skill Name</Label>
                      <Input
                        id="skill_name"
                        value={newSkill.name}
                        onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                        placeholder="e.g., JavaScript, Guitar, Spanish"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="skill_category">Category</Label>
                      <Select
                        value={newSkill.category}
                        onValueChange={(value) => setNewSkill({ ...newSkill, category: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {SKILL_CATEGORIES.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="skill_level">Your Level</Label>
                      <Select
                        value={newSkill.level}
                        onValueChange={(value: 'beginner' | 'intermediate' | 'advanced' | 'expert') => setNewSkill({ ...newSkill, level: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {SKILL_LEVELS.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex gap-6">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="is_teaching"
                        checked={newSkill.is_teaching}
                        onCheckedChange={(checked) => setNewSkill({ ...newSkill, is_teaching: checked })}
                      />
                      <Label htmlFor="is_teaching">I can teach this</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="is_learning"
                        checked={newSkill.is_learning}
                        onCheckedChange={(checked) => setNewSkill({ ...newSkill, is_learning: checked })}
                      />
                      <Label htmlFor="is_learning">I want to learn this</Label>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit">Add Skill</Button>
                    <Button type="button" variant="outline" onClick={() => setShowSkillForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Skills List */}
          {skillsLoading ? (
            <div className="text-center py-6 sm:py-8 text-sm sm:text-base">Loading skills...</div>
          ) : skills.length === 0 ? (
            <div className="text-center py-6 sm:py-8 text-gray-500">
              <BookOpen className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 opacity-50" />
              <p className="text-sm sm:text-base">No skills added yet. Add your first skill to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {skills.map((skill) => (
                <Card key={skill.id} className="relative">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-sm sm:text-base truncate pr-2">{skill.name}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteSkill(skill.id)}
                        className="h-6 w-6 p-0 text-gray-400 hover:text-red-500 flex-shrink-0"
                      >
                        <X className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Badge variant="secondary" className="text-xs">
                        {skill.category}
                      </Badge>
                      <Badge className={`${getLevelColor(skill.level)} text-xs`}>
                        {skill.level}
                      </Badge>
                      <div className="flex flex-wrap gap-1 sm:gap-2 text-xs">
                        {skill.is_teaching && (
                          <Badge variant="outline" className="text-green-600 border-green-600 text-xs px-2 py-0">
                            Teaching
                          </Badge>
                        )}
                        {skill.is_learning && (
                          <Badge variant="outline" className="text-blue-600 border-blue-600 text-xs px-2 py-0">
                            Learning
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Badge Collection */}
      <ProfileBadgeDisplay />
      </div>
    </div>
  );
}
