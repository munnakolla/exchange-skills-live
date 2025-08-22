import React from 'react';
import { 
  Crown, 
  Trophy, 
  Star, 
  Zap, 
  Flame, 
  Shield, 
  Diamond, 
  Medal,
  Award,
  Target,
  BookOpen,
  Users,
  Heart,
  Rocket,
  Gem,
  Sparkles,
  Coffee,
  Clock,
  Globe,
  Camera,
  Lightbulb,
  Music,
  Palette,
  Code,
  Mountain,
  Compass,
  Sun,
  Moon,
  TreePine,
  Waves,
  Rainbow,
  Bird,
  Feather
} from 'lucide-react';

export interface BadgeData {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  borderColor: string;
  points: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';
  category: 'milestone' | 'achievement' | 'special' | 'seasonal';
  earned: boolean;
  earnedDate?: string;
  progress?: number;
  requirement?: string;
}

export const milestonesBadges: BadgeData[] = [
  {
    id: 'newcomer',
    name: 'Newcomer',
    description: 'Welcome to SkillSwap! Your journey begins here.',
    icon: Star,
    color: '#10B981',
    bgColor: '#D1FAE5',
    borderColor: '#34D399',
    points: 100,
    rarity: 'common',
    category: 'milestone',
    earned: true,
    earnedDate: '2024-08-01'
  },
  {
    id: 'rising_star',
    name: 'Rising Star',
    description: 'Earned 500 points. You\'re gaining momentum!',
    icon: Sparkles,
    color: '#3B82F6',
    bgColor: '#DBEAFE',
    borderColor: '#60A5FA',
    points: 500,
    rarity: 'uncommon',
    category: 'milestone',
    earned: true,
    earnedDate: '2024-08-10'
  },
  {
    id: 'skilled_learner',
    name: 'Skilled Learner',
    description: 'Reached 1,000 points. Your dedication shows!',
    icon: BookOpen,
    color: '#8B5CF6',
    bgColor: '#EDE9FE',
    borderColor: '#A78BFA',
    points: 1000,
    rarity: 'rare',
    category: 'milestone',
    earned: true,
    earnedDate: '2024-08-15'
  },
  {
    id: 'knowledge_seeker',
    name: 'Knowledge Seeker',
    description: 'Accumulated 2,500 points. Impressive progress!',
    icon: Target,
    color: '#F59E0B',
    bgColor: '#FEF3C7',
    borderColor: '#FBBF24',
    points: 2500,
    rarity: 'epic',
    category: 'milestone',
    earned: false,
    progress: 85,
    requirement: '2,500 points needed'
  },
  {
    id: 'skill_master',
    name: 'Skill Master',
    description: 'Earned 5,000 points. You\'re becoming a master!',
    icon: Trophy,
    color: '#EF4444',
    bgColor: '#FEE2E2',
    borderColor: '#F87171',
    points: 5000,
    rarity: 'legendary',
    category: 'milestone',
    earned: false,
    progress: 42,
    requirement: '5,000 points needed'
  },
  {
    id: 'grandmaster',
    name: 'Grandmaster',
    description: 'Reached 10,000 points. Elite status achieved!',
    icon: Crown,
    color: '#7C3AED',
    bgColor: '#F3E8FF',
    borderColor: '#8B5CF6',
    points: 10000,
    rarity: 'mythic',
    category: 'milestone',
    earned: false,
    progress: 21,
    requirement: '10,000 points needed'
  }
];

export const specialBadges: BadgeData[] = [
  {
    id: 'streak_warrior',
    name: 'Streak Warrior',
    description: 'Maintained a 30-day learning streak. Consistency is key!',
    icon: Flame,
    color: '#FF6B35',
    bgColor: '#FFE8E1',
    borderColor: '#FF8A65',
    points: 750,
    rarity: 'epic',
    category: 'achievement',
    earned: false,
    progress: 70,
    requirement: '30 consecutive days'
  },
  {
    id: 'community_hero',
    name: 'Community Hero',
    description: 'Helped 100+ community members. You make a difference!',
    icon: Heart,
    color: '#EC4899',
    bgColor: '#FCE7F3',
    borderColor: '#F472B6',
    points: 1200,
    rarity: 'legendary',
    category: 'achievement',
    earned: false,
    progress: 25,
    requirement: '100 members helped'
  },
  {
    id: 'speed_learner',
    name: 'Speed Learner',
    description: 'Completed 20 skills in your first month. Lightning fast!',
    icon: Zap,
    color: '#FBBF24',
    bgColor: '#FEF3C7',
    borderColor: '#FCD34D',
    points: 800,
    rarity: 'rare',
    category: 'achievement',
    earned: false,
    progress: 60,
    requirement: '20 skills in 30 days'
  },
  {
    id: 'mentor_supreme',
    name: 'Mentor Supreme',
    description: 'Achieved 4.9+ rating from 200+ teaching sessions.',
    icon: Shield,
    color: '#059669',
    bgColor: '#D1FAE5',
    borderColor: '#10B981',
    points: 1500,
    rarity: 'mythic',
    category: 'achievement',
    earned: false,
    progress: 15,
    requirement: '4.9+ rating, 200+ sessions'
  },
  {
    id: 'innovation_pioneer',
    name: 'Innovation Pioneer',
    description: 'First to learn 5 newly added skills. Always ahead!',
    icon: Rocket,
    color: '#7C2D12',
    bgColor: '#FED7AA',
    borderColor: '#FB923C',
    points: 600,
    rarity: 'rare',
    category: 'special',
    earned: true,
    earnedDate: '2024-08-12'
  },
  {
    id: 'diamond_contributor',
    name: 'Diamond Contributor',
    description: 'Contributed exceptional value to the community.',
    icon: Diamond,
    color: '#1E40AF',
    bgColor: '#DBEAFE',
    borderColor: '#3B82F6',
    points: 2000,
    rarity: 'mythic',
    category: 'special',
    earned: false,
    progress: 5,
    requirement: 'Special community contribution'
  },
  // Creative and Fun Badges
  {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Completed 50+ learning sessions after 10 PM. Burning the midnight oil!',
    icon: Moon,
    color: '#4C1D95',
    bgColor: '#EDE9FE',
    borderColor: '#8B5CF6',
    points: 400,
    rarity: 'uncommon',
    category: 'achievement',
    earned: true,
    earnedDate: '2024-08-14'
  },
  {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Completed 50+ learning sessions before 6 AM. Rise and shine!',
    icon: Sun,
    color: '#F59E0B',
    bgColor: '#FEF3C7',
    borderColor: '#FBBF24',
    points: 400,
    rarity: 'uncommon',
    category: 'achievement',
    earned: false,
    progress: 80,
    requirement: '50 early morning sessions'
  },
  {
    id: 'coffee_master',
    name: 'Coffee Master',
    description: 'Learned about coffee brewing techniques from 10 different mentors.',
    icon: Coffee,
    color: '#92400E',
    bgColor: '#FEF3C7',
    borderColor: '#D97706',
    points: 300,
    rarity: 'rare',
    category: 'achievement',
    earned: false,
    progress: 30,
    requirement: '10 coffee mentors'
  },
  {
    id: 'time_traveler',
    name: 'Time Traveler',
    description: 'Active on SkillSwap across 4 different time zones in a week.',
    icon: Clock,
    color: '#7C2D12',
    bgColor: '#FED7AA',
    borderColor: '#FB923C',
    points: 500,
    rarity: 'rare',
    category: 'special',
    earned: false,
    progress: 75,
    requirement: '4 time zones in one week'
  },
  {
    id: 'polyglot',
    name: 'Polyglot',
    description: 'Learning or teaching 5+ different languages. Babel would be proud!',
    icon: Globe,
    color: '#059669',
    bgColor: '#D1FAE5',
    borderColor: '#10B981',
    points: 800,
    rarity: 'epic',
    category: 'achievement',
    earned: false,
    progress: 60,
    requirement: '5 different languages'
  },
  {
    id: 'memory_palace',
    name: 'Memory Palace',
    description: 'Completed advanced memory techniques course and helped 25+ students.',
    icon: Lightbulb,
    color: '#FBBF24',
    bgColor: '#FEF3C7',
    borderColor: '#FCD34D',
    points: 600,
    rarity: 'rare',
    category: 'achievement',
    earned: false,
    progress: 40,
    requirement: 'Memory course + 25 students'
  },
  {
    id: 'rainbow_learner',
    name: 'Rainbow Learner',
    description: 'Mastered skills across all 7 main categories. You\'re truly colorful!',
    icon: Rainbow,
    color: '#EC4899',
    bgColor: '#FCE7F3',
    borderColor: '#F472B6',
    points: 1200,
    rarity: 'legendary',
    category: 'achievement',
    earned: false,
    progress: 85,
    requirement: 'Skills in all 7 categories'
  },
  {
    id: 'zen_master',
    name: 'Zen Master',
    description: 'Maintained perfect 5.0 rating for 100+ meditation/mindfulness sessions.',
    icon: TreePine,
    color: '#059669',
    bgColor: '#ECFDF5',
    borderColor: '#10B981',
    points: 900,
    rarity: 'epic',
    category: 'achievement',
    earned: false,
    progress: 20,
    requirement: '5.0 rating, 100+ sessions'
  },
  {
    id: 'digital_nomad',
    name: 'Digital Nomad',
    description: 'Taught skills while traveling to 10+ different cities.',
    icon: Compass,
    color: '#7C3AED',
    bgColor: '#F3E8FF',
    borderColor: '#8B5CF6',
    points: 700,
    rarity: 'epic',
    category: 'special',
    earned: false,
    progress: 40,
    requirement: '10 different cities'
  },
  {
    id: 'shutterbugs',
    name: 'Shutterbug Supreme',
    description: 'Captured and shared 1000+ skill-learning moments.',
    icon: Camera,
    color: '#1F2937',
    bgColor: '#F3F4F6',
    borderColor: '#6B7280',
    points: 500,
    rarity: 'rare',
    category: 'achievement',
    earned: true,
    earnedDate: '2024-08-16'
  },
  {
    id: 'harmony_maker',
    name: 'Harmony Maker',
    description: 'Created beautiful music collaborations with 50+ community members.',
    icon: Music,
    color: '#7C2D12',
    bgColor: '#FED7AA',
    borderColor: '#FB923C',
    points: 650,
    rarity: 'rare',
    category: 'achievement',
    earned: false,
    progress: 55,
    requirement: '50 music collaborations'
  },
  {
    id: 'code_wizard',
    name: 'Code Wizard',
    description: 'Mastered 10+ programming languages and frameworks. Magic in the making!',
    icon: Code,
    color: '#1E40AF',
    bgColor: '#DBEAFE',
    borderColor: '#3B82F6',
    points: 1000,
    rarity: 'legendary',
    category: 'achievement',
    earned: false,
    progress: 70,
    requirement: '10+ programming languages'
  },
  {
    id: 'art_virtuoso',
    name: 'Art Virtuoso',
    description: 'Created masterpieces in 5+ different art mediums.',
    icon: Palette,
    color: '#EC4899',
    bgColor: '#FCE7F3',
    borderColor: '#F472B6',
    points: 750,
    rarity: 'epic',
    category: 'achievement',
    earned: false,
    progress: 40,
    requirement: '5+ art mediums'
  },
  {
    id: 'wave_rider',
    name: 'Wave Rider',
    description: 'Successfully adapted to 20+ major platform updates and changes.',
    icon: Waves,
    color: '#0891B2',
    bgColor: '#CFFAFE',
    borderColor: '#06B6D4',
    points: 350,
    rarity: 'uncommon',
    category: 'special',
    earned: true,
    earnedDate: '2024-08-13'
  },
  {
    id: 'mountain_climber',
    name: 'Mountain Climber',
    description: 'Overcame 100+ learning challenges and obstacles. Nothing stops you!',
    icon: Mountain,
    color: '#78716C',
    bgColor: '#F5F5F4',
    borderColor: '#A8A29E',
    points: 800,
    rarity: 'epic',
    category: 'achievement',
    earned: false,
    progress: 65,
    requirement: '100+ challenges overcome'
  },
  {
    id: 'phoenix_rising',
    name: 'Phoenix Rising',
    description: 'Made an incredible comeback after 6+ months of inactivity.',
    icon: Bird,
    color: '#DC2626',
    bgColor: '#FEE2E2',
    borderColor: '#F87171',
    points: 600,
    rarity: 'rare',
    category: 'special',
    earned: false,
    progress: 0,
    requirement: 'Return after 6+ months break'
  },
  {
    id: 'feather_light',
    name: 'Feather Light',
    description: 'Taught complex concepts in the simplest, most elegant way possible.',
    icon: Feather,
    color: '#6366F1',
    bgColor: '#E0E7FF',
    borderColor: '#818CF8',
    points: 550,
    rarity: 'rare',
    category: 'achievement',
    earned: false,
    progress: 30,
    requirement: 'Excellence in simplifying complex topics'
  }
];

export const seasonalBadges: BadgeData[] = [
  {
    id: 'summer_scholar',
    name: 'Summer Scholar',
    description: 'Completed 30+ learning sessions during summer months. Hot learning streak!',
    icon: Sun,
    color: '#F59E0B',
    bgColor: '#FEF3C7',
    borderColor: '#FBBF24',
    points: 400,
    rarity: 'uncommon',
    category: 'seasonal',
    earned: true,
    earnedDate: '2024-08-20'
  },
  {
    id: 'winter_warrior',
    name: 'Winter Warrior',
    description: 'Stayed active during the coldest months. Nothing can freeze your passion!',
    icon: TreePine,
    color: '#059669',
    bgColor: '#ECFDF5',
    borderColor: '#10B981',
    points: 450,
    rarity: 'uncommon',
    category: 'seasonal',
    earned: false,
    progress: 0,
    requirement: 'Active during winter months'
  },
  {
    id: 'spring_awakening',
    name: 'Spring Awakening',
    description: 'Blossomed with 20+ new skills learned in spring. Fresh growth!',
    icon: Sparkles,
    color: '#EC4899',
    bgColor: '#FCE7F3',
    borderColor: '#F472B6',
    points: 350,
    rarity: 'rare',
    category: 'seasonal',
    earned: false,
    progress: 60,
    requirement: '20 skills in spring'
  },
  {
    id: 'autumn_harvest',
    name: 'Autumn Harvest',
    description: 'Reaped the rewards of teaching 50+ sessions in fall.',
    icon: Medal,
    color: '#D97706',
    bgColor: '#FED7AA',
    borderColor: '#FB923C',
    points: 500,
    rarity: 'rare',
    category: 'seasonal',
    earned: false,
    progress: 30,
    requirement: '50 teaching sessions in fall'
  }
];

interface BadgeDisplayProps {
  badge: BadgeData;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showProgress?: boolean;
  interactive?: boolean;
}

export const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ 
  badge, 
  size = 'md', 
  showProgress = false,
  interactive = false 
}) => {
  const IconComponent = badge.icon;
  
  const sizeConfig = {
    sm: { container: 'w-12 h-12', icon: 'w-6 h-6', text: 'text-xs' },
    md: { container: 'w-16 h-16', icon: 'w-8 h-8', text: 'text-sm' },
    lg: { container: 'w-20 h-20', icon: 'w-10 h-10', text: 'text-base' },
    xl: { container: 'w-24 h-24', icon: 'w-12 h-12', text: 'text-lg' }
  };

  const config = sizeConfig[size];
  
  return (
    <div className={`flex flex-col items-center gap-2 ${interactive ? 'cursor-pointer hover:scale-105 transition-transform' : ''}`}>
      <div 
        className={`${config.container} rounded-full flex items-center justify-center border-2 ${
          badge.earned ? 'shadow-lg' : 'opacity-60 grayscale'
        } transition-all duration-300`}
        style={{
          backgroundColor: badge.earned ? badge.bgColor : '#F3F4F6',
          borderColor: badge.earned ? badge.borderColor : '#D1D5DB'
        }}
      >
        <IconComponent 
          className={config.icon}
          style={{ color: badge.earned ? badge.color : '#9CA3AF' }}
        />
      </div>
      
      <div className="text-center">
        <p className={`${config.text} font-semibold ${badge.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
          {badge.name}
        </p>
        {showProgress && !badge.earned && badge.progress && (
          <div className="w-16 bg-gray-200 rounded-full h-1.5 mt-1">
            <div 
              className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${badge.progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

interface BadgeTooltipProps {
  badge: BadgeData;
  children: React.ReactNode;
}

export const BadgeTooltip: React.FC<BadgeTooltipProps> = ({ badge, children }) => {
  return (
    <div className="group relative">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
        <div className="font-semibold">{badge.name}</div>
        <div className="text-gray-300">{badge.description}</div>
        {badge.earned ? (
          <div className="text-green-400">Earned: {new Date(badge.earnedDate!).toLocaleDateString()}</div>
        ) : (
          <div className="text-yellow-400">Progress: {badge.progress || 0}%</div>
        )}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"/>
      </div>
    </div>
  );
};

export const getRarityGlow = (rarity: BadgeData['rarity']): string => {
  switch (rarity) {
    case 'common': return 'drop-shadow-sm';
    case 'uncommon': return 'drop-shadow-md filter brightness-110';
    case 'rare': return 'drop-shadow-lg filter brightness-115';
    case 'epic': return 'drop-shadow-xl filter brightness-120 saturate-125';
    case 'legendary': return 'drop-shadow-2xl filter brightness-125 saturate-150';
    case 'mythic': return 'drop-shadow-2xl filter brightness-130 saturate-200';
    default: return 'drop-shadow-sm';
  }
};
