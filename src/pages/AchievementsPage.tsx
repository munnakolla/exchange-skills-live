import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AllBadgesModal from "@/components/AllBadgesModal";
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
  Share
} from "lucide-react";

const AchievementsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBadge, setSelectedBadge] = useState<BadgeData | null>(null);
  const [isAllBadgesModalOpen, setIsAllBadgesModalOpen] = useState(false);

  // Combine all badges
  const allBadges = [...milestonesBadges, ...specialBadges, ...seasonalBadges];
  const earnedBadges = allBadges.filter(badge => badge.earned);
  const totalPoints = earnedBadges.reduce((sum, badge) => sum + badge.points, 0);
  
  // Calculate current user level based on points
  const getUserLevel = (points: number) => {
    if (points >= 10000) return { level: 10, title: 'Grandmaster', nextLevel: null };
    if (points >= 5000) return { level: 9, title: 'Master', nextLevel: 10000 };
    if (points >= 2500) return { level: 8, title: 'Expert', nextLevel: 5000 };
    if (points >= 1000) return { level: 7, title: 'Advanced', nextLevel: 2500 };
    if (points >= 500) return { level: 6, title: 'Intermediate', nextLevel: 1000 };
    if (points >= 100) return { level: 5, title: 'Beginner', nextLevel: 500 };
    return { level: 1, title: 'Newcomer', nextLevel: 100 };
  };

  const userLevel = getUserLevel(totalPoints);
  const progressToNext = userLevel.nextLevel 
    ? ((totalPoints % userLevel.nextLevel) / userLevel.nextLevel) * 100 
    : 100;

  const categories = [
    { id: "all", name: "All Badges", icon: Award },
    { id: "milestone", name: "Milestones", icon: Trophy },
    { id: "achievement", name: "Achievements", icon: Star },
    { id: "special", name: "Special", icon: Crown },
    { id: "seasonal", name: "Seasonal", icon: Gift }
  ];

  const filteredBadges = selectedCategory === "all" 
    ? allBadges 
    : allBadges.filter(badge => badge.category === selectedCategory);

  const completionRate = Math.round((earnedBadges.length / allBadges.length) * 100);

  const handleBadgeClick = (badge: BadgeData) => {
    setSelectedBadge(badge);
  };

  const handleShareBadge = (badge: BadgeData) => {
    // In a real app, this would share the badge
    navigator.clipboard.writeText(`I just earned the "${badge.name}" badge on SkillSwap! ${badge.description}`);
  };

  const BadgeCard = ({ badge }: { badge: BadgeData }) => {
    const IconComponent = badge.icon;
    
    return (
      <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer ${
        badge.earned ? "border-green-200 bg-green-50/30" : "border-gray-200"
      } ${getRarityGlow(badge.rarity)}`}
      onClick={() => handleBadgeClick(badge)}>
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
                <CardDescription className="mt-1">
                  {badge.description}
                </CardDescription>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge 
                variant="outline" 
                className={`capitalize ${
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
                >
                  <Share className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Zap className="h-4 w-4" />
                {badge.points} points
              </span>
              {badge.earned && badge.earnedDate && (
                <span className="text-green-600 text-sm">
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
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Your Badge Collection</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Showcase your achievements and milestones in the SkillSwap community
            </p>
          </div>

          {/* User Level Display */}
          <Card className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                  {userLevel.level}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{userLevel.title}</h3>
                  <p className="text-muted-foreground">Level {userLevel.level}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{totalPoints.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Points</p>
              </div>
            </div>
            {userLevel.nextLevel && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress to next level</span>
                  <span>{totalPoints} / {userLevel.nextLevel}</span>
                </div>
                <Progress value={progressToNext} className="h-3" />
                <p className="text-xs text-muted-foreground">
                  {userLevel.nextLevel - totalPoints} points to reach the next level
                </p>
              </div>
            )}
          </Card>

          {/* Badge Showcase */}
          <Card className="mb-8 p-6">
            <h3 className="text-lg font-semibold mb-6">Featured Badges</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {earnedBadges.slice(0, 6).map((badge) => (
                <BadgeTooltip key={badge.id} badge={badge}>
                  <div 
                    className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => handleBadgeClick(badge)}
                  >
                    <BadgeDisplay badge={badge} size="lg" interactive />
                  </div>
                </BadgeTooltip>
              ))}
            </div>
            {earnedBadges.length > 6 && (
              <div className="text-center mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsAllBadgesModalOpen(true)}
                >
                  View All {earnedBadges.length} Badges
                </Button>
              </div>
            )}
          </Card>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="text-center p-6 border-2 border-yellow-200 bg-yellow-50/30">
              <Trophy className="h-8 w-8 mx-auto mb-3 text-yellow-600" />
              <h3 className="font-bold text-2xl text-yellow-700">{earnedBadges.length}</h3>
              <p className="text-sm text-yellow-600">Badges Earned</p>
            </Card>
            
            <Card className="text-center p-6">
              <Zap className="h-8 w-8 mx-auto mb-3 text-blue-500" />
              <h3 className="font-bold text-2xl">{totalPoints.toLocaleString()}</h3>
              <p className="text-sm text-muted-foreground">Total Points</p>
            </Card>
            
            <Card className="text-center p-6">
              <Target className="h-8 w-8 mx-auto mb-3 text-green-500" />
              <h3 className="font-bold text-2xl">{completionRate}%</h3>
              <p className="text-sm text-muted-foreground">Collection Rate</p>
            </Card>
            
            <Card className="text-center p-6">
              <TrendingUp className="h-8 w-8 mx-auto mb-3 text-purple-500" />
              <h3 className="font-bold text-2xl">
                {allBadges.filter(badge => !badge.earned && badge.progress && badge.progress > 50).length}
              </h3>
              <p className="text-sm text-muted-foreground">Near Completion</p>
            </Card>
          </div>

          {/* Progress Overview */}
          <Card className="mb-8 p-6">
            <h3 className="text-lg font-semibold mb-4">Collection Progress</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Badge Collection</span>
                <span className="font-medium">{completionRate}%</span>
              </div>
              <Progress value={completionRate} className="h-3" />
              <p className="text-sm text-muted-foreground">
                {earnedBadges.length} of {allBadges.length} badges collected
              </p>
            </div>
          </Card>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
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
                      {earnedInCategory}/{categoryBadges.length}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">{category.name}</h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Medal className="h-4 w-4" />
                    {filteredBadges.filter(badge => badge.earned).length} earned
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredBadges.map((badge) => (
                    <BadgeCard key={badge.id} badge={badge} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Recent Badges */}
          {earnedBadges.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-6">Recent Badges</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {earnedBadges
                  .sort((a, b) => new Date(b.earnedDate!).getTime() - new Date(a.earnedDate!).getTime())
                  .slice(0, 3)
                  .map((badge) => {
                    const IconComponent = badge.icon;
                    return (
                      <Card key={badge.id} className="p-4 border-green-200 bg-green-50/30 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleBadgeClick(badge)}>
                        <div className="flex items-center gap-3">
                          <div 
                            className="p-2 rounded-lg border-2"
                            style={{
                              backgroundColor: badge.bgColor,
                              borderColor: badge.borderColor
                            }}
                          >
                            <IconComponent 
                              className="h-5 w-5" 
                              style={{ color: badge.color }}
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm">{badge.name}</h3>
                            <p className="text-xs text-muted-foreground">
                              {new Date(badge.earnedDate!).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            +{badge.points}
                          </Badge>
                        </div>
                      </Card>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Milestone Progress */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Milestone Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {milestonesBadges.map((badge) => (
                <Card key={badge.id} className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <BadgeDisplay badge={badge} size="sm" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{badge.name}</h3>
                      <p className="text-xs text-muted-foreground">{badge.points} points</p>
                    </div>
                  </div>
                  {!badge.earned && badge.progress && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span>Progress</span>
                        <span>{badge.progress}%</span>
                      </div>
                      <Progress value={badge.progress} className="h-2" />
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Creative & Seasonal Badges */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-purple-500" />
              Creative & Seasonal Collection
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...specialBadges.slice(5, 15), ...seasonalBadges].map((badge) => (
                <Card key={badge.id} className={`p-4 text-center hover:shadow-lg transition-all duration-300 cursor-pointer ${
                  badge.earned ? 'bg-gradient-to-br from-white to-green-50 border-green-200' : ''
                }`}
                onClick={() => handleBadgeClick(badge)}>
                  <BadgeTooltip badge={badge}>
                    <div className="space-y-3">
                      <BadgeDisplay badge={badge} size="md" />
                      <div>
                        <h3 className="font-semibold text-sm truncate">{badge.name}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">{badge.description}</p>
                        <div className="flex items-center justify-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {badge.points} pts
                          </Badge>
                          {badge.earned && (
                            <Badge variant="outline" className="text-xs bg-green-100 text-green-700">
                              Earned
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </BadgeTooltip>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      {/* All Badges Modal */}
      <AllBadgesModal 
        isOpen={isAllBadgesModalOpen} 
        onClose={() => setIsAllBadgesModalOpen(false)} 
      />
      
      <Footer />
    </div>
  );
};

export default AchievementsPage;
