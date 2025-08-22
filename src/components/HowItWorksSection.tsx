import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { UserPlus, Search, Calendar, Star, PlayCircle, MessageSquare, Video, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Create Your Profile",
    description: "Sign up and list the skills you want to teach and learn. Add your location, availability, and experience level.",
    highlight: "Free to join",
    details: [
      "Add skills you can teach",
      "List skills you want to learn", 
      "Set your availability",
      "Add location preferences",
      "Upload profile photo"
    ],
    demo: "Watch how Emma created her profile in under 3 minutes and got 5 matches!"
  },
  {
    step: "02", 
    icon: Search,
    title: "Find Your Match",
    description: "Use our smart search system to discover people in your area who can teach what you want to learn.",
    highlight: "Intelligent matching",
    details: [
      "Smart search functionality",
      "Location-based results",
      "Filter by skill level",
      "Check availability",
      "Read reviews and ratings"
    ],
    demo: "See how our search helped John find 12 guitar teachers within 5 miles"
  },
  {
    step: "03",
    icon: Calendar,
    title: "Schedule Sessions",
    description: "Connect with your match, chat about your learning goals, and schedule your first skill exchange session.",
    highlight: "Flexible scheduling",
    details: [
      "In-app messaging system",
      "Calendar integration",
      "Video or in-person options",
      "Session reminders",
      "Easy rescheduling"
    ],
    demo: "Maria and Alex scheduled their cooking-for-yoga exchange in 2 simple steps"
  },
  {
    step: "04",
    icon: Star,
    title: "Learn & Teach",
    description: "Attend your session, learn something new, and teach your skill in return. Rate your experience and build your reputation.",
    highlight: "Mutual growth",
    details: [
      "Attend your session",
      "Learn new skills",
      "Teach your expertise",
      "Rate your experience",
      "Build your reputation"
    ],
    demo: "David taught photography and learned Spanish cooking in one amazing session!"
  }
];

const HowItWorksSection = () => {
  const [selectedStep, setSelectedStep] = useState<typeof steps[0] | null>(null);
  const { isAuthenticated } = useAuth();

  // Dynamic steps based on authentication status
  const dynamicSteps = isAuthenticated ? [
    {
      step: "01",
      icon: UserPlus,
      title: "Complete Your Profile",
      description: "Update your profile with skills you want to teach and learn. Add your location, availability, and experience level.",
      highlight: "Quick setup",
      details: [
        "Add skills you can teach",
        "List skills you want to learn", 
        "Set your availability",
        "Add location preferences",
        "Upload profile photo"
      ],
      demo: "Watch how Emma updated her profile in under 3 minutes and got 5 matches!"
    },
    {
      step: "02", 
      icon: Search,
      title: "Find Your Match",
      description: "Use our smart search system to discover people in your area who can teach what you want to learn.",
      highlight: "Intelligent matching",
      details: [
        "Smart search functionality",
        "Location-based results",
        "Filter by skill level",
        "Check availability",
        "Read reviews and ratings"
      ],
      demo: "See how our search helped John find 12 guitar teachers within 5 miles"
    },
    {
      step: "03",
      icon: Calendar,
      title: "Schedule Sessions",
      description: "Connect with your match, chat about your learning goals, and schedule your first skill exchange session.",
      highlight: "Flexible scheduling",
      details: [
        "In-app messaging system",
        "Calendar integration",
        "Video or in-person options",
        "Session reminders",
        "Easy rescheduling"
      ],
      demo: "Maria and Alex scheduled their cooking-for-yoga exchange in 2 simple steps"
    },
    {
      step: "04",
      icon: Star,
      title: "Learn & Teach",
      description: "Attend your session, learn something new, and teach your skill in return. Rate your experience and build your reputation.",
      highlight: "Start exchanging",
      details: [
        "Attend your session",
        "Learn new skills",
        "Teach your expertise",
        "Rate your experience",
        "Build your reputation"
      ],
      demo: "David taught photography and learned Spanish cooking in one amazing session!"
    }
  ] : steps;

  return (
    <section id="how-it-works" className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6">
            How <span className="gradient-text">SkillSwap</span> Works
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4 sm:px-0">
            Getting started is simple. Follow these four easy steps to begin your 
            skill-sharing journey and connect with learners and teachers in your community.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 sm:mb-14 lg:mb-16">
          {dynamicSteps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line for desktop - hidden on mobile */}
              {index < dynamicSteps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent -translate-y-1/2 z-0" />
              )}
              
              <Dialog>
                <DialogTrigger asChild>
                  <Card 
                    className="p-4 sm:p-6 lg:p-8 border-card-border hover:shadow-strong transition-all duration-300 skill-card-hover group relative z-10 cursor-pointer touch-target"
                    onClick={() => setSelectedStep(step)}
                  >
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-hero rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <step.icon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
                        </div>
                        <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-muted-foreground/30 group-hover:text-primary/50 transition-colors">
                          {step.step}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                          {step.description}
                        </p>
                        <div className="inline-block bg-success/10 text-success px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                          {step.highlight}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center pt-2 sm:pt-4">
                        <Button variant="ghost" size="sm" className="text-primary text-sm">
                          <PlayCircle className="h-4 w-4 mr-2" />
                          See Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                </DialogTrigger>
                
                <DialogContent className="max-w-[95vw] sm:max-w-lg lg:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl lg:text-2xl">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-hero rounded-xl sm:rounded-2xl flex items-center justify-center">
                        <step.icon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
                      </div>
                      <span className="leading-tight">Step {step.step}: {step.title}</span>
                    </DialogTitle>
                    <DialogDescription className="text-sm sm:text-base lg:text-lg">
                      {step.description}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">What you'll do:</h4>
                      <div className="space-y-2">
                        {step.details.map((detail, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <Star className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm sm:text-base">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center gap-2 text-sm sm:text-base">
                        <PlayCircle className="h-4 w-4 text-blue-500" />
                        Success Story:
                      </h4>
                      <p className="text-xs sm:text-sm text-blue-800">{step.demo}</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      {isAuthenticated ? (
                        <Button className="flex-1 text-sm sm:text-base" asChild>
                          <Link to="/find-partners">
                            Find Learning Partners
                          </Link>
                        </Button>
                      ) : (
                        <Button className="flex-1 text-sm sm:text-base" asChild>
                          <Link to="/get-started">
                            Get Started Now
                          </Link>
                        </Button>
                      )}
                      {index < dynamicSteps.length - 1 && (
                        <Button 
                          variant="outline" 
                          className="flex-1 text-sm sm:text-base"
                          onClick={() => setSelectedStep(dynamicSteps[index + 1])}
                        >
                          Next Step
                        </Button>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>

        {/* Video Call vs Outdoor Meeting Section */}
        <div className="bg-gradient-subtle rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 mb-8 sm:mb-10 lg:mb-12">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-8">
            Choose Your <span className="gradient-text">Learning Style</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <Card className="p-4 sm:p-6 text-center hover:shadow-lg transition-shadow touch-target">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Video className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
              </div>
              <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Video Sessions</h4>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                Perfect for remote learning, convenient scheduling, and digital skills
              </p>
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                <div>• Screen sharing capabilities</div>
                <div>• Record sessions for review</div>
                <div>• Weather independent</div>
                <div>• Global connections</div>
              </div>
              <Badge className="bg-blue-100 text-blue-800 text-xs sm:text-sm">Popular for Tech Skills</Badge>
            </Card>
            
            <Card className="p-4 sm:p-6 text-center hover:shadow-lg transition-shadow touch-target">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <MapPin className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
              </div>
              <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Outdoor Meetings</h4>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                Great for hands-on learning, physical skills, and building local connections
              </p>
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                <div>• Face-to-face interaction</div>
                <div>• Hands-on practice</div>
                <div>• Public safety locations</div>
                <div>• Local community building</div>
              </div>
              <Badge className="bg-green-100 text-green-800 text-xs sm:text-sm">Popular for Creative Skills</Badge>
            </Card>
          </div>
        </div>

        <div className="text-center bg-gradient-subtle rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
            {isAuthenticated ? (
              <>Ready to <span className="gradient-text">Start Exchanging</span>?</>
            ) : (
              <>Ready to Start Your <span className="gradient-text">Learning Journey</span>?</>
            )}
          </h3>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
            {isAuthenticated ? (
              "You're all set! Start finding learning partners in your area and begin exchanging skills today."
            ) : (
              "Join thousands of learners and teachers who are already sharing skills and building meaningful connections in their communities."
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            {isAuthenticated ? (
              <>
                <Button variant="hero" size="lg" asChild className="w-full sm:w-auto">
                  <Link to="/find-partners">Find Learning Partners</Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                  <Link to="/my-skills">Manage My Skills</Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="hero" size="lg" asChild className="w-full sm:w-auto">
                  <Link to="/get-started">Create Free Account</Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                  <Link to="/categories">Browse Skills First</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;