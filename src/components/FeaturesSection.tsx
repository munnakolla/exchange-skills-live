import { Card } from "@/components/ui/card";
import { 
  MessageSquare, 
  Calendar, 
  MapPin, 
  Award, 
  Shield, 
  Zap,
  Users,
  Search
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Smart Matching",
    description: "Our AI-powered algorithm connects you with perfect skill exchange partners based on your interests and availability.",
    gradient: "bg-gradient-primary"
  },
  {
    icon: MessageSquare,
    title: "Real-time Chat",
    description: "Communicate instantly with your skill partners through our integrated messaging system with file sharing capabilities.",
    gradient: "bg-gradient-secondary"
  },
  {
    icon: Calendar,
    title: "Easy Scheduling",
    description: "Book and manage your skill exchange sessions with our intuitive calendar integration and reminder system.",
    gradient: "bg-gradient-hero"
  },
  {
    icon: MapPin,
    title: "Local Discovery",
    description: "Find skilled individuals in your area with geo-based search and connect with your local learning community.",
    gradient: "bg-gradient-primary"
  },
  {
    icon: Award,
    title: "Gamification",
    description: "Earn badges, points, and achievements as you learn and teach. Track your progress and celebrate milestones.",
    gradient: "bg-gradient-secondary"
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description: "Your safety is our priority. Verified profiles, secure authentication, and community moderation keep you protected.",
    gradient: "bg-gradient-hero"
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Join a vibrant community of learners and teachers. Participate in group sessions and skill-focused events.",
    gradient: "bg-gradient-primary"
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description: "Rate and review your learning experiences. Get immediate feedback to improve your teaching and learning skills.",
    gradient: "bg-gradient-secondary"
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Why Choose <span className="gradient-text">SkillSwap</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of peer-to-peer learning with our comprehensive 
            platform designed to make skill sharing seamless, safe, and rewarding.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 border-card-border hover:shadow-strong transition-all duration-300 skill-card-hover group"
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 ${feature.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;