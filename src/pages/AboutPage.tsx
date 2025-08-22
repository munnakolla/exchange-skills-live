import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SkillSwapLogo from "@/components/SkillSwapLogo";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Users,
  Globe,
  Lightbulb,
  Heart,
  Star,
  Award,
  Target,
  Zap,
  BookOpen,
  Coffee,
  Video,
  MapPin,
  ArrowRight,
  CheckCircle,
  Handshake
} from "lucide-react";

const AboutPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const stats = [
    { number: "10,000+", label: "Active Learners", icon: <Users className="h-6 w-6" /> },
    { number: "500+", label: "Skills Available", icon: <BookOpen className="h-6 w-6" /> },
    { number: "50+", label: "Countries", icon: <Globe className="h-6 w-6" /> },
    { number: "25,000+", label: "Skill Exchanges", icon: <Handshake className="h-6 w-6" /> },
  ];

  const values = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Community First",
      description: "We believe in the power of community learning and mutual support."
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-500" />,
      title: "Global Accessibility",
      description: "Making skill sharing accessible to everyone, everywhere, regardless of background."
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-yellow-500" />,
      title: "Innovation",
      description: "Continuously evolving our platform to enhance the learning experience."
    },
    {
      icon: <Star className="h-8 w-8 text-purple-500" />,
      title: "Quality",
      description: "Ensuring high-quality exchanges through our verification and feedback systems."
    }
  ];

  const features = [
    {
      icon: <Video className="h-6 w-6 text-blue-600" />,
      title: "Video Sessions",
      description: "Connect face-to-face with learners through integrated video calls"
    },
    {
      icon: <MapPin className="h-6 w-6 text-green-600" />,
      title: "Local Meetups",
      description: "Schedule in-person meetings at convenient locations"
    },
    {
      icon: <Award className="h-6 w-6 text-purple-600" />,
      title: "Achievement System",
      description: "Earn badges and track your learning progress"
    },
    {
      icon: <Coffee className="h-6 w-6 text-amber-600" />,
      title: "Flexible Learning",
      description: "Learn at your own pace, on your own schedule"
    }
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Former educator passionate about democratizing learning through technology.",
      avatar: "SJ"
    },
    {
      name: "Mike Chen",
      role: "CTO",
      bio: "Tech enthusiast building scalable platforms for global skill sharing.",
      avatar: "MC"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Community",
      bio: "Community builder focused on creating safe and inclusive learning spaces.",
      avatar: "ER"
    },
    {
      name: "David Kim",
      role: "Product Manager",
      bio: "UX advocate ensuring our platform serves learners' needs effectively.",
      avatar: "DK"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6 sm:mb-8">
            <SkillSwapLogo variant="default" size={60} showText={false} className="sm:hidden" />
            <SkillSwapLogo variant="default" size={80} showText={false} className="hidden sm:block" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About SkillSwap
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2">
            We're on a mission to create the world's largest peer-to-peer learning community, 
            where everyone can both teach and learn, fostering growth through shared knowledge.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Button 
              size="lg" 
              onClick={() => navigate(isAuthenticated ? '/dashboard' : '/get-started')}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 w-full sm:w-auto"
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Join Our Community'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/features')}
              className="w-full sm:w-auto"
            >
              Explore Features
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover-lift smooth-transition">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex justify-center mb-3 sm:mb-4 text-primary">
                    {stat.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-1 sm:mb-2">{stat.number}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">Our Mission</h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-12 leading-relaxed px-2">
              At SkillSwap, we believe that everyone has something valuable to teach and something new to learn. 
              Our platform breaks down traditional barriers to education by connecting people directly, 
              creating a global community where knowledge flows freely and learning never stops.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <Card className="text-center interactive-card hover-lift smooth-transition">
                <CardContent className="p-4 sm:p-6">
                  <Target className="h-10 sm:h-12 w-10 sm:w-12 text-primary mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Democratize Learning</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Make quality education accessible to everyone, regardless of location or economic status.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center interactive-card hover-lift smooth-transition">
                <CardContent className="p-4 sm:p-6">
                  <Zap className="h-10 sm:h-12 w-10 sm:w-12 text-primary mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Empower Individuals</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Enable people to monetize their skills while helping others grow and succeed.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center interactive-card hover-lift smooth-transition">
                <CardContent className="p-4 sm:p-6">
                  <Users className="h-10 sm:h-12 w-10 sm:w-12 text-primary mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Build Community</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Foster meaningful connections between learners and teachers worldwide.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Our Values</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              These core values guide everything we do at SkillSwap
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-0 shadow-lg interactive-card hover-lift smooth-transition">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex justify-center mb-3 sm:mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Platform Features</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              Discover the tools that make skill sharing seamless and effective
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow interactive-card hover-lift smooth-transition">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center mb-3 sm:mb-4">
                    {feature.icon}
                    <h3 className="text-base sm:text-lg font-semibold ml-3">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm sm:text-base">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-12">
            <Button 
              size="lg" 
              onClick={() => navigate('/features')}
              variant="outline"
              className="w-full sm:w-auto hover-lift smooth-transition"
            >
              View All Features
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Meet Our Team</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              Passionate individuals working to make skill sharing accessible to everyone
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center interactive-card hover-lift smooth-transition">
                <CardContent className="p-4 sm:p-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mx-auto mb-3 sm:mb-4">
                    {member.avatar}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{member.name}</h3>
                  <Badge variant="secondary" className="mb-2 sm:mb-3 text-xs sm:text-sm">{member.role}</Badge>
                  <p className="text-muted-foreground text-xs sm:text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Start Learning?</h2>
          <p className="text-base sm:text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
            Join thousands of learners who are already sharing skills and growing together on SkillSwap.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate(isAuthenticated ? '/dashboard' : '/get-started')}
              className="w-full sm:w-auto hover-lift smooth-transition"
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Get Started Today'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-primary w-full sm:w-auto hover-lift smooth-transition"
              onClick={() => navigate('/how-it-works')}
            >
              Learn How It Works
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
