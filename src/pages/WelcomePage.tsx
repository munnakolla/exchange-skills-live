import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Sparkles,
  BookOpen, 
  Users, 
  Calendar,
  MessageSquare,
  TrendingUp,
  Award,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const WelcomePage = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const welcomeSteps = [
    {
      icon: Sparkles,
      title: "Welcome to SkillSwap!",
      description: `Hi ${profile?.full_name?.split(' ')[0] || 'there'}! You've successfully joined our amazing community of learners and teachers.`,
      color: "text-purple-600",
      bg: "bg-purple-100"
    },
    {
      icon: BookOpen,
      title: "Share Your Skills",
      description: "Add skills you can teach and skills you want to learn. Our platform will help you find the perfect matches.",
      color: "text-blue-600",
      bg: "bg-blue-100"
    },
    {
      icon: Users,
      title: "Connect with Others",
      description: "Find learning partners who complement your skills. Build meaningful connections while growing together.",
      color: "text-green-600",
      bg: "bg-green-100"
    },
    {
      icon: Calendar,
      title: "Schedule Sessions",
      description: "Book learning sessions at your convenience. Video calls, in-person meetups, or chat sessions - your choice!",
      color: "text-orange-600",
      bg: "bg-orange-100"
    }
  ];

  const quickActions = [
    {
      icon: BookOpen,
      title: "Add Your Skills",
      description: "Tell us what you can teach and what you want to learn",
      link: "/profile",
      color: "text-blue-600",
      bg: "bg-blue-50 hover:bg-blue-100"
    },
    {
      icon: Users,
      title: "Find Partners",
      description: "Discover people who match your learning goals",
      link: "/find-partners",
      color: "text-green-600",
      bg: "bg-green-50 hover:bg-green-100"
    },
    {
      icon: TrendingUp,
      title: "Browse Skills",
      description: "Explore popular skills and trending topics",
      link: "/browse-skills",
      color: "text-purple-600",
      bg: "bg-purple-50 hover:bg-purple-100"
    },
    {
      icon: MessageSquare,
      title: "Start Chatting",
      description: "Begin conversations with your matches",
      link: "/messages",
      color: "text-orange-600",
      bg: "bg-orange-50 hover:bg-orange-100"
    }
  ];

  // Auto-advance welcome steps
  useEffect(() => {
    if (currentStep < welcomeSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 3500); // Slightly longer duration for better reading
      return () => clearTimeout(timer);
    }
  }, [currentStep, welcomeSteps.length]);

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const handleGetStarted = () => {
    navigate("/dashboard");
  };

  const handleSkipToAction = (link: string) => {
    navigate(link);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Welcome Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-4 mb-6">
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                <AvatarImage src={profile?.avatar_url} alt={profile?.full_name} />
                <AvatarFallback className="text-2xl font-bold bg-gradient-hero text-white">
                  {profile?.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleGetStarted}
                className="ml-4"
              >
                Skip to Dashboard
              </Button>
            </div>
            <h1 className="text-4xl font-bold mb-4">
              🎉 Welcome to SkillSwap, {profile?.full_name?.split(' ')[0] || 'Friend'}!
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              You're now part of a vibrant community where knowledge flows freely and everyone grows together.
            </p>
          </div>

          {/* Welcome Steps Carousel */}
          <Card className="p-8 mb-12 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className={`p-4 rounded-full ${welcomeSteps[currentStep].bg}`}>
                  {(() => {
                    const Icon = welcomeSteps[currentStep].icon;
                    return <Icon className={`h-12 w-12 ${welcomeSteps[currentStep].color}`} />;
                  })()}
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-4">{welcomeSteps[currentStep].title}</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                {welcomeSteps[currentStep].description}
              </p>

              {/* Step Indicators */}
              <div className="flex justify-center gap-2 mb-6">
                {welcomeSteps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleStepClick(index)}
                    className={`h-2 w-8 rounded-full transition-all duration-300 hover:scale-110 ${
                      index <= currentStep ? 'bg-primary' : 'bg-muted hover:bg-muted-foreground/20'
                    }`}
                    aria-label={`Go to step ${index + 1}`}
                  />
                ))}
              </div>

              {currentStep === welcomeSteps.length - 1 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">You're all set to start your learning journey!</span>
                  </div>
                  <Button 
                    size="lg" 
                    variant="hero" 
                    onClick={handleGetStarted}
                    className="px-8"
                  >
                    Let's Get Started!
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Quick Actions Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">What would you like to do first?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {quickActions.map((action, index) => (
                <Card 
                  key={index}
                  className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-lg border-0 ${action.bg}`}
                  onClick={() => handleSkipToAction(action.link)}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      {(() => {
                        const Icon = action.icon;
                        return <Icon className={`h-6 w-6 ${action.color}`} />;
                      })()}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
                      <p className="text-muted-foreground mb-4">{action.description}</p>
                      <Button variant="outline" size="sm">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Platform Features Overview */}
          <Card className="p-8 bg-gradient-hero text-white">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Your SkillSwap Journey Starts Now</h2>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Join thousands of learners who've already exchanged over 50,000 hours of knowledge. 
                Your skills matter, and someone out there needs exactly what you have to offer!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold">10K+</div>
                  <div className="text-white/80">Active Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-white/80">Skills Available</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">50K+</div>
                  <div className="text-white/80">Hours Exchanged</div>
                </div>
              </div>

              <Button 
                variant="secondary" 
                size="lg" 
                onClick={handleGetStarted}
                className="px-8"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WelcomePage;
