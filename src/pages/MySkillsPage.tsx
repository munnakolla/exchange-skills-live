import { useState } from "react";
import { Plus, Edit2, Trash2, ArrowLeft, Award, BookOpen, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

interface Skill {
  id: string;
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'native';
  type: 'teaching' | 'learning';
  description?: string;
  experience?: string;
}

const MySkillsPage = () => {
  const [skills, setSkills] = useState<Skill[]>([
    {
      id: '1',
      name: 'JavaScript',
      category: 'programming',
      level: 'expert',
      type: 'teaching',
      description: 'Full-stack JavaScript development with React and Node.js',
      experience: '5+ years'
    },
    {
      id: '2',
      name: 'React',
      category: 'programming',
      level: 'expert',
      type: 'teaching',
      description: 'Modern React development with hooks, context, and testing',
      experience: '4+ years'
    },
    {
      id: '3',
      name: 'Python',
      category: 'programming',
      level: 'intermediate',
      type: 'learning',
      description: 'Want to learn data science and machine learning with Python'
    },
    {
      id: '4',
      name: 'Guitar',
      category: 'music',
      level: 'beginner',
      type: 'learning',
      description: 'Complete beginner looking to learn acoustic guitar'
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    level: '',
    type: '',
    description: '',
    experience: ''
  });

  const categories = [
    { value: "programming", label: "Programming" },
    { value: "design", label: "Design" },
    { value: "music", label: "Music" },
    { value: "languages", label: "Languages" },
    { value: "academic", label: "Academic" },
    { value: "business", label: "Business" },
    { value: "crafts", label: "Arts & Crafts" },
    { value: "sports", label: "Sports & Fitness" },
    { value: "cooking", label: "Cooking" },
    { value: "other", label: "Other" }
  ];

  const levels = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
    { value: "expert", label: "Expert" },
    { value: "native", label: "Native" }
  ];

  const teachingSkills = skills.filter(skill => skill.type === 'teaching');
  const learningSkills = skills.filter(skill => skill.type === 'learning');

  const handleAddSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      level: formData.level as Skill['level'],
      type: formData.type as Skill['type'],
      description: formData.description,
      experience: formData.experience
    };

    setSkills([...skills, newSkill]);
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEditSkill = () => {
    if (!editingSkill) return;

    const updatedSkills = skills.map(skill =>
      skill.id === editingSkill.id
        ? {
            ...skill,
            name: formData.name,
            category: formData.category,
            level: formData.level as Skill['level'],
            type: formData.type as Skill['type'],
            description: formData.description,
            experience: formData.experience
          }
        : skill
    );

    setSkills(updatedSkills);
    resetForm();
    setEditingSkill(null);
  };

  const handleDeleteSkill = (skillId: string) => {
    setSkills(skills.filter(skill => skill.id !== skillId));
  };

  const openEditDialog = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      type: skill.type,
      description: skill.description || '',
      experience: skill.experience || ''
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      level: '',
      type: '',
      description: '',
      experience: ''
    });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      case 'expert': return 'bg-red-100 text-red-800';
      case 'native': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const SkillCard = ({ skill }: { skill: Skill }) => (
    <Card key={skill.id} className="p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-lg">{skill.name}</h3>
            <Badge variant="outline" className="text-xs">
              {categories.find(c => c.value === skill.category)?.label}
            </Badge>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Badge className={`text-xs ${getLevelColor(skill.level)}`}>
              {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
            </Badge>
            {skill.type === 'teaching' ? (
              <div className="flex items-center gap-1 text-sm text-green-600">
                <Award className="h-3 w-3" />
                Teaching
              </div>
            ) : (
              <div className="flex items-center gap-1 text-sm text-blue-600">
                <BookOpen className="h-3 w-3" />
                Learning
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => openEditDialog(skill)}
          >
            <Edit2 className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDeleteSkill(skill.id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {skill.description && (
        <p className="text-sm text-muted-foreground mb-3">{skill.description}</p>
      )}

      <div className="flex justify-between items-center text-sm">
        {skill.experience && (
          <div className="text-muted-foreground">
            {skill.experience} experience
          </div>
        )}
      </div>
    </Card>
  );

  const SkillDialog = () => (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>
          {editingSkill ? 'Edit Skill' : 'Add New Skill'}
        </DialogTitle>
        <DialogDescription>
          {editingSkill ? 'Update your skill information' : 'Add a skill you want to teach or learn'}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Skill Name
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="col-span-3"
            placeholder="e.g., JavaScript, Guitar, Spanish"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="category" className="text-right">
            Category
          </Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="level" className="text-right">
            Level
          </Label>
          <Select
            value={formData.level}
            onValueChange={(value) => setFormData({ ...formData, level: value })}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select your level" />
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

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="type" className="text-right">
            Type
          </Label>
          <Select
            value={formData.type}
            onValueChange={(value) => setFormData({ ...formData, type: value })}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Teaching or Learning" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="teaching">Teaching</SelectItem>
              <SelectItem value="learning">Learning</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="col-span-3"
            placeholder="Describe your skill or what you want to learn"
            rows={3}
          />
        </div>

        {formData.type === 'teaching' && (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="experience" className="text-right">
              Experience
            </Label>
            <Input
              id="experience"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="col-span-3"
              placeholder="e.g., 3+ years, Professional"
            />
          </div>
        )}
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => {
          setIsAddDialogOpen(false);
          setEditingSkill(null);
          resetForm();
        }}>
          Cancel
        </Button>
        <Button onClick={editingSkill ? handleEditSkill : handleAddSkill}>
          {editingSkill ? 'Update' : 'Add'} Skill
        </Button>
      </DialogFooter>
    </DialogContent>
  );

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
              <h1 className="text-3xl font-bold">My Skills</h1>
              <p className="text-muted-foreground">Manage your teaching skills and learning goals for knowledge exchange</p>
            </div>
          </div>
          <Dialog open={isAddDialogOpen || !!editingSkill} onOpenChange={(open) => {
            if (!open) {
              setIsAddDialogOpen(false);
              setEditingSkill(null);
              resetForm();
            }
          }}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Skill
              </Button>
            </DialogTrigger>
            <SkillDialog />
          </Dialog>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-100">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{teachingSkills.length}</p>
                <p className="text-sm text-muted-foreground">Teaching Skills</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-100">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{learningSkills.length}</p>
                <p className="text-sm text-muted-foreground">Learning Goals</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-yellow-100">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {Math.round((teachingSkills.length / (teachingSkills.length + learningSkills.length)) * 100) || 0}%
                </p>
                <p className="text-sm text-muted-foreground">Teaching Focus</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Teaching Skills */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Award className="h-6 w-6 text-green-600" />
              Skills I Teach ({teachingSkills.length})
            </h2>
          </div>
          
          {teachingSkills.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {teachingSkills.map(skill => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No teaching skills yet</h3>
              <p className="text-muted-foreground mb-4">
                Share your expertise by adding skills you can teach others
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Teaching Skill
              </Button>
            </Card>
          )}
        </div>

        {/* Learning Skills */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-blue-600" />
              Skills I Want to Learn ({learningSkills.length})
            </h2>
          </div>
          
          {learningSkills.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {learningSkills.map(skill => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No learning goals yet</h3>
              <p className="text-muted-foreground mb-4">
                Add skills you want to learn to find the right teachers
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Learning Goal
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MySkillsPage;
