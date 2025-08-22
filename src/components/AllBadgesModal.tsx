import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  BadgeDisplay, 
  BadgeTooltip, 
  milestonesBadges, 
  specialBadges,
  seasonalBadges,
  getRarityGlow,
  type BadgeData 
} from "@/components/BadgeSystem";
import { 
  Award, 
  Trophy, 
  Star, 
  Target, 
  Zap,
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
  Medal,
  Crown,
  Flame,
  Heart,
  CheckCircle,
  Lock,
  Gift,
  Sparkles,
  Copy,
  Share,
  Search,
  Filter
} from "lucide-react";

interface AllBadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AllBadgesModal = ({ isOpen, onClose }: AllBadgesModalProps) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState<"all" | "earned" | "unearned">("all");

  // Combine all badges
  const allBadges = [...milestonesBadges, ...specialBadges, ...seasonalBadges];
  const earnedBadges = allBadges.filter(badge => badge.earned);

  const categories = [
    { id: "all", name: "All", icon: Award, count: allBadges.length },
    { id: "milestone", name: "Milestones", icon: Trophy, count: milestonesBadges.length },
    { id: "achievement", name: "Achievements", icon: Star, count: specialBadges.length },
    { id: "seasonal", name: "Seasonal", icon: Gift, count: seasonalBadges.length }
  ];

  // Filter badges based on search, category, and earned status
  const filteredBadges = allBadges.filter(badge => {
    const matchesSearch = badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         badge.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || badge.category === selectedCategory;
    
    const matchesFilter = filterBy === "all" || 
                         (filterBy === "earned" && badge.earned) ||
                         (filterBy === "unearned" && !badge.earned);
    
    return matchesSearch && matchesCategory && matchesFilter;
  });

  const handleShareBadge = (badge: BadgeData) => {
    navigator.clipboard.writeText(`I just earned the "${badge.name}" badge on SkillSwap! ${badge.description}`);
  };

  const BadgeCard = ({ badge }: { badge: BadgeData }) => {
    const IconComponent = badge.icon;
    
    return (
      <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
        badge.earned ? "border-green-200 bg-green-50/30" : "border-gray-200"
      } ${getRarityGlow(badge.rarity)}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div 
                className={`p-3 rounded-lg border-2 ${badge.earned ? 'shadow-md' : 'opacity-60 grayscale'}`}
                style={{
                  backgroundColor: badge.earned ? badge.bgColor : '#F3F4F6',
                  borderColor: badge.earned ? badge.borderColor : '#D1D5DB'
                }}
              >
                <IconComponent 
                  className="h-6 w-6"
                  style={{ color: badge.earned ? badge.color : '#9CA3AF' }}
                />
              </div>
              <div className="flex-1">
                <CardTitle className={`text-lg flex items-center gap-2 ${
                  badge.earned ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {badge.name}
                  {badge.earned && <CheckCircle className="h-4 w-4 text-green-600" />}
                  {!badge.earned && <Lock className="h-4 w-4 text-gray-400" />}
                </CardTitle>
                <CardDescription className="mt-1 text-sm">
                  {badge.description}
                </CardDescription>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge 
                variant="outline" 
                className={`capitalize text-xs ${
                  badge.rarity === 'mythic' ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-300' :
                  badge.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                  badge.rarity === 'epic' ? 'bg-purple-100 text-purple-800 border-purple-300' :
                  badge.rarity === 'rare' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                  badge.rarity === 'uncommon' ? 'bg-green-100 text-green-800 border-green-300' :
                  'bg-gray-100 text-gray-800 border-gray-300'
                }`}
              >
                {badge.rarity}
              </Badge>
              {badge.earned && (
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShareBadge(badge);
                  }}
                  className="h-6 w-6 p-0"
                >
                  <Share className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Zap className="h-4 w-4" />
                {badge.points} points
              </span>
              {badge.earned && badge.earnedDate && (
                <span className="text-green-600 text-xs">
                  Earned {new Date(badge.earnedDate).toLocaleDateString()}
                </span>
              )}
            </div>
            
            {!badge.earned && badge.progress && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{badge.progress}%</span>
                </div>
                <Progress value={badge.progress} className="h-2" />
                {badge.requirement && (
                  <p className="text-xs text-muted-foreground">
                    {badge.requirement}
                  </p>
                )}
              </div>
            )}
          </div>
        </CardContent>
        
        {/* Special glow effect for mythic badges */}
        {badge.earned && badge.rarity === 'mythic' && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-100/30 to-transparent pointer-events-none" />
        )}
      </Card>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            All Badges Collection
          </DialogTitle>
          <DialogDescription>
            Explore all {allBadges.length} badges available in SkillSwap. You've earned {earnedBadges.length} so far!
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 sticky top-0 bg-background z-10 pb-4 border-b">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search badges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={filterBy === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterBy("all")}
              >
                All ({allBadges.length})
              </Button>
              <Button
                variant={filterBy === "earned" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterBy("earned")}
                className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
              >
                Earned ({earnedBadges.length})
              </Button>
              <Button
                variant={filterBy === "unearned" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterBy("unearned")}
              >
                Unearned ({allBadges.length - earnedBadges.length})
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center p-4">
              <Trophy className="h-6 w-6 mx-auto mb-2 text-yellow-600" />
              <h3 className="font-bold text-lg">{earnedBadges.length}</h3>
              <p className="text-xs text-muted-foreground">Earned</p>
            </Card>
            
            <Card className="text-center p-4">
              <Target className="h-6 w-6 mx-auto mb-2 text-blue-500" />
              <h3 className="font-bold text-lg">{Math.round((earnedBadges.length / allBadges.length) * 100)}%</h3>
              <p className="text-xs text-muted-foreground">Collection Rate</p>
            </Card>
            
            <Card className="text-center p-4">
              <Crown className="h-6 w-6 mx-auto mb-2 text-purple-500" />
              <h3 className="font-bold text-lg">
                {earnedBadges.filter(badge => badge.rarity === 'legendary' || badge.rarity === 'mythic').length}
              </h3>
              <p className="text-xs text-muted-foreground">Rare Badges</p>
            </Card>
            
            <Card className="text-center p-4">
              <Zap className="h-6 w-6 mx-auto mb-2 text-green-500" />
              <h3 className="font-bold text-lg">
                {earnedBadges.reduce((sum, badge) => sum + badge.points, 0)}
              </h3>
              <p className="text-xs text-muted-foreground">Total Points</p>
            </Card>
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              {categories.map((category) => {
                const IconComponent = category.icon;
                const categoryBadges = category.id === "all" 
                  ? allBadges 
                  : allBadges.filter(badge => badge.category === category.id);
                const earnedInCategory = categoryBadges.filter(badge => badge.earned).length;
                
                return (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id} 
                    className="flex flex-col items-center gap-1 h-auto py-3"
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="text-xs font-medium">{category.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {earnedInCategory}/{category.count}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{category.name} Badges</h3>
                  <Badge variant="outline">
                    {filteredBadges.length} badges
                  </Badge>
                </div>
                
                {filteredBadges.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Medal className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No badges found matching your criteria</p>
                    <p className="text-sm">Try adjusting your search or filters</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredBadges.map((badge) => (
                      <BadgeTooltip key={badge.id} badge={badge}>
                        <BadgeCard badge={badge} />
                      </BadgeTooltip>
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AllBadgesModal;
