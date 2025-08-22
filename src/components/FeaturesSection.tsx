import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  MessageSquare, 
  Calendar, 
  MapPin, 
  Award, 
  Shield, 
  Zap,
  Users,
  Search,
  ArrowRight,
  CheckCircle,
  Star,
  Play,
  UserPlus,
  Sparkles
} from "lucide-react";
import { useState } from "react";

const features = [
  {
    icon: Search,
    title: "Smart Matching",
    description: "Our intelligent search system helps you find perfect skill exchange partners based on your interests, skills, and location.",
    gradient: "bg-gradient-primary",
    details: [
      "Skill-based filtering",
      "Location-based matching",
      "Experience level compatibility",
      "Category-based discovery",
      "Quick search functionality"
    ],
    demo: "See how Sarah from London found 12 guitar teachers within 5 miles"
  },
  {
    icon: MessageSquare,
    title: "Real-time Chat",
    description: "Communicate instantly with your skill partners through our integrated messaging system with file sharing capabilities.",
    gradient: "bg-gradient-secondary",
    details: [
      "Instant messaging",
      "File sharing (images, documents)",
      "Voice messages",
      "Video chat integration",
      "Translation support"
    ],
    demo: "Exchange lesson plans, photos, and coordinate meetings seamlessly"
  },
  {
    icon: Calendar,
    title: "Easy Scheduling",
    description: "Book and manage your skill exchange sessions with our intuitive calendar integration and reminder system.",
    gradient: "bg-gradient-hero",
    details: [
      "Calendar synchronization",
      "Automatic reminders",
      "Reschedule options",
      "Time zone support",
      "Availability tracking"
    ],
    demo: "Book your cooking lesson Tuesday 7PM, get automatic reminders"
  },
  {
    icon: MapPin,
    title: "Local Discovery",
    description: "Find skilled individuals in your area with geo-based search and connect with your local learning community.",
    gradient: "bg-gradient-primary",
    details: [
      "Radius-based search",
      "Popular locations",
      "Safety verification",
      "Public meeting spots",
      "Community events"
    ],
    demo: "Find photographers within 10 miles of Central Park"
  },
  {
    icon: Award,
    title: "Gamification",
    description: "Earn badges, points, and achievements as you learn and teach. Track your progress and celebrate milestones.",
    gradient: "bg-gradient-secondary",
    details: [
      "Skill progression tracking",
      "Achievement badges",
      "Leaderboards",
      "Teaching streaks",
      "Community recognition"
    ],
    demo: "Unlock 'Guitar Hero' badge after teaching 10 successful lessons"
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description: "Your safety is our priority. Verified profiles, secure authentication, and community moderation keep you protected.",
    gradient: "bg-gradient-hero",
    details: [
      "Identity verification",
      "Background checks",
      "Secure payments",
      "Community reporting",
      "24/7 moderation"
    ],
    demo: "All users verified with ID, rated by community, monitored sessions"
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Join a vibrant community of learners and teachers. Participate in group sessions and skill-focused events.",
    gradient: "bg-gradient-primary",
    details: [
      "Group learning sessions",
      "Skill meetups",
      "Community events",
      "Expert workshops",
      "Peer support groups"
    ],
    demo: "Join weekly photography walks with 15+ local enthusiasts"
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description: "Rate and review your learning experiences. Get immediate feedback to improve your teaching and learning skills.",
    gradient: "bg-gradient-secondary",
    details: [
      "Real-time ratings",
      "Detailed reviews",
      "Progress tracking",
      "Improvement suggestions",
      "Achievement recognition"
    ],
    demo: "Get rated 5 stars for your Excel tutorial, receive teaching tips"
  }
];

const FeaturesSection = () => {
  const [selectedFeature, setSelectedFeature] = useState<typeof features[0] | null>(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleTryFeature = (featureTitle: string) => {
    if (isAuthenticated) {
      // Navigate to specific feature pages for authenticated users
      switch (featureTitle) {
        case "Smart Matching":
          navigate("/find-partners");
          break;
        case "Real-time Chat":
          navigate("/messages");
          break;
        case "Easy Scheduling":
          navigate("/sessions");
          break;
        case "Local Discovery":
          navigate("/browse-skills");
          break;
        case "Gamification":
          navigate("/achievements");
          break;
        case "Secure Platform":
          navigate("/profile");
          break;
        case "Community Driven":
          navigate("/dashboard");
          break;
        case "Instant Feedback":
          navigate("/skills");
          break;
        default:
          navigate("/dashboard");
      }
    } else {
      navigate("/get-started");
    }
  };

  const handleGetStarted = () => {
    navigate(isAuthenticated ? "/dashboard" : "/get-started");
  };

  return (
    <section id="features" className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Why Choose <span className="gradient-text">SkillSwap</span>?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
            Experience the future of peer-to-peer learning with our comprehensive 
            platform designed to make skill sharing seamless, safe, and rewarding.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Card 
                  className="p-4 sm:p-6 border-card-border hover:shadow-strong transition-all duration-300 skill-card-hover group cursor-pointer interactive-card smooth-transition hover-lift"
                  onClick={() => setSelectedFeature(feature)}
                >
                  <div className="space-y-3 sm:space-y-4">
                    <div className={`w-10 h-10 sm:w-12 h-12 ${feature.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-5 w-5 sm:h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
                      Learn more <ArrowRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-2xl mx-4">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3 text-xl sm:text-2xl">
                    <div className={`w-10 h-10 sm:w-12 h-12 ${feature.gradient} rounded-xl flex items-center justify-center`}>
                      <feature.icon className="h-5 w-5 sm:h-6 w-6 text-white" />
                    </div>
                    {feature.title}
                  </DialogTitle>
                  <DialogDescription className="text-base sm:text-lg">
                    {feature.description}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold mb-3">Key Features:</h4>
                    <div className="space-y-2">
                      {feature.details.map((detail, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2 text-sm sm:text-base">
                      <Star className="h-4 w-4 text-yellow-500" />
                      Real Example:
                    </h4>
                    <p className="text-xs sm:text-sm text-blue-800">{feature.demo}</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      className="flex-1 hover-lift smooth-transition w-full" 
                      size="lg"
                      onClick={() => handleTryFeature(feature.title)}
                    >
                      {isAuthenticated ? (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Use This Feature
                        </>
                      ) : (
                        <>
                          <UserPlus className="h-4 w-4 mr-2" />
                          Try This Feature
                        </>
                      )}
                    </Button>
                    {!isAuthenticated && (
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="hover-lift smooth-transition w-full sm:w-auto"
                        onClick={() => navigate("/sign-in")}
                      >
                        Sign In
                      </Button>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {/* Enhanced CTA Section for Unauthenticated Users */}
        {!isAuthenticated && (
          <div className="mt-16 sm:mt-20 text-center">
            <Card className="max-w-4xl mx-auto p-6 sm:p-8 bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-primary/20 interactive-card hover-lift smooth-transition">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex justify-center">
                  <div className="w-12 h-12 sm:w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center hover-lift">
                    <Sparkles className="h-6 w-6 sm:h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold">Ready to Experience These Features?</h3>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
                  Join thousands of learners who are already using these powerful features to grow their skills and connect with amazing teachers.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 hover-lift smooth-transition w-full sm:w-auto"
                    onClick={handleGetStarted}
                  >
                    <UserPlus className="h-5 w-5 mr-2" />
                    Get Started for Free
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="hover-lift smooth-transition w-full sm:w-auto"
                    onClick={() => navigate("/how-it-works")}
                  >
                    <Play className="h-5 w-5 mr-2" />
                    See How It Works
                  </Button>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Free to join
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    No credit card required
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Start learning immediately
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Enhanced CTA Section for Authenticated Users */}
        {isAuthenticated && (
          <div className="mt-16 sm:mt-20 text-center">
            <Card className="max-w-4xl mx-auto p-6 sm:p-8 bg-gradient-to-br from-green-50 to-blue-50 border-green-200 interactive-card hover-lift smooth-transition">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex justify-center">
                  <div className="w-12 h-12 sm:w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center hover-lift">
                    <Star className="h-6 w-6 sm:h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold">Explore Your Dashboard</h3>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
                  You have access to all these amazing features! Head to your dashboard to start your skill-swapping journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:opacity-90 hover-lift smooth-transition w-full sm:w-auto"
                    onClick={() => navigate("/dashboard")}
                  >
                    <ArrowRight className="h-5 w-5 mr-2" />
                    Go to Dashboard
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="hover-lift smooth-transition w-full sm:w-auto"
                    onClick={() => navigate("/find-partners")}
                  >
                    <Users className="h-5 w-5 mr-2" />
                    Find Learning Partners
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturesSection;