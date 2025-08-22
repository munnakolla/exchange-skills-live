import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BadgeDisplay, 
  BadgeTooltip, 
  milestonesBadges, 
  specialBadges,
  seasonalBadges,
  type BadgeData 
} from "@/components/BadgeSystem";
import { Trophy, Star, Crown, Settings } from "lucide-react";
import { Link } from "react-router-dom";

interface ProfileBadgeDisplayProps {
  showAll?: boolean;
  limit?: number;
}

const ProfileBadgeDisplay: React.FC<ProfileBadgeDisplayProps> = ({ 
  showAll = false, 
  limit = 6 
}) => {
  const allBadges = [...milestonesBadges, ...specialBadges, ...seasonalBadges];
  const earnedBadges = allBadges.filter(badge => badge.earned);
  const totalPoints = earnedBadges.reduce((sum, badge) => sum + badge.points, 0);
  
  const displayBadges = showAll ? earnedBadges : earnedBadges.slice(0, limit);
  
  const getBadgeRankTitle = (points: number): string => {
    if (points >= 10000) return "Grandmaster";
    if (points >= 5000) return "Master";
    if (points >= 2500) return "Expert";
    if (points >= 1000) return "Advanced";
    if (points >= 500) return "Intermediate";
    return "Beginner";
  };

  const getFeaturedBadge = (): BadgeData | null => {
    // Return the highest rarity earned badge
    const rarityOrder = ['mythic', 'legendary', 'epic', 'rare', 'uncommon', 'common'];
    for (const rarity of rarityOrder) {
      const badge = earnedBadges.find(b => b.rarity === rarity);
      if (badge) return badge;
    }
    return null;
  };

  const featuredBadge = getFeaturedBadge();

  if (earnedBadges.length === 0) {
    return (
      <Card className="p-4 sm:p-6">
        <CardHeader className="text-center pb-3 sm:pb-4 px-0">
          <Trophy className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-muted-foreground mb-2" />
          <CardTitle className="text-base sm:text-lg">Start Your Badge Journey</CardTitle>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Complete activities to earn your first badges!
          </p>
        </CardHeader>
        <CardContent className="text-center px-0">
          <Button asChild size="sm" className="text-sm">
            <Link to="/achievements">Explore Badges</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="p-3 sm:p-4 lg:p-6">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 sm:pb-4 px-0">
        <div className="mb-3 sm:mb-0">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
            Badge Collection
          </CardTitle>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            {earnedBadges.length} badges • {totalPoints.toLocaleString()} points
          </p>
        </div>
        <Button variant="outline" size="sm" asChild className="self-start sm:self-auto">
          <Link to="/achievements">
            <Settings className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm">View All</span>
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="space-y-4 sm:space-y-6 px-0">
        {/* Rank Display */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 gap-3 sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm sm:text-base">
              {Math.floor(totalPoints / 500) + 1}
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base">{getBadgeRankTitle(totalPoints)}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">{totalPoints} points</p>
            </div>
          </div>
          {featuredBadge && (
            <BadgeTooltip badge={featuredBadge}>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <Badge variant="outline" className="text-xs px-2 py-0">Featured</Badge>
                <BadgeDisplay badge={featuredBadge} size="sm" />
              </div>
            </BadgeTooltip>
          )}
        </div>

        {/* Badge Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 lg:gap-4">
          {displayBadges.map((badge) => (
            <BadgeTooltip key={badge.id} badge={badge}>
              <div className="flex justify-center">
                <BadgeDisplay badge={badge} size="md" interactive />
              </div>
            </BadgeTooltip>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3 sm:pt-4 border-t">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Trophy className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-600" />
            </div>
            <p className="text-base sm:text-lg font-semibold">{earnedBadges.length}</p>
            <p className="text-xs text-muted-foreground">Badges</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Star className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
            </div>
            <p className="text-base sm:text-lg font-semibold">{totalPoints}</p>
            <p className="text-xs text-muted-foreground">Points</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Crown className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
            </div>
            <p className="text-base sm:text-lg font-semibold">
              {earnedBadges.filter(b => b.rarity === 'legendary' || b.rarity === 'mythic').length}
            </p>
            <p className="text-xs text-muted-foreground">Rare</p>
          </div>
        </div>

        {!showAll && earnedBadges.length > limit && (
          <div className="text-center pt-3 sm:pt-4">
            <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm">
              <Link to="/achievements">
                View All {earnedBadges.length} Badges
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileBadgeDisplay;
