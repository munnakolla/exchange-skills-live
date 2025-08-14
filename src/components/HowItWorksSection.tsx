import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Search, Calendar, Star } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Create Your Profile",
    description: "Sign up and list the skills you want to teach and learn. Add your location, availability, and experience level.",
    highlight: "Free to join"
  },
  {
    step: "02", 
    icon: Search,
    title: "Find Your Match",
    description: "Use our smart matching algorithm to discover people in your area who can teach what you want to learn.",
    highlight: "AI-powered matching"
  },
  {
    step: "03",
    icon: Calendar,
    title: "Schedule Sessions",
    description: "Connect with your match, chat about your learning goals, and schedule your first skill exchange session.",
    highlight: "Flexible scheduling"
  },
  {
    step: "04",
    icon: Star,
    title: "Learn & Teach",
    description: "Attend your session, learn something new, and teach your skill in return. Rate your experience and build your reputation.",
    highlight: "Mutual growth"
  }
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            How <span className="gradient-text">SkillSwap</span> Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Getting started is simple. Follow these four easy steps to begin your 
            skill-sharing journey and connect with learners and teachers in your community.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent -translate-y-1/2 z-0" />
              )}
              
              <Card className="p-8 border-card-border hover:shadow-strong transition-all duration-300 skill-card-hover group relative z-10">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <span className="text-4xl font-bold text-muted-foreground/30 group-hover:text-primary/50 transition-colors">
                      {step.step}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {step.description}
                    </p>
                    <div className="inline-block bg-success/10 text-success px-3 py-1 rounded-full text-sm font-medium">
                      {step.highlight}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center bg-gradient-subtle rounded-2xl p-12">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Start Your <span className="gradient-text">Learning Journey</span>?
          </h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of learners and teachers who are already sharing skills and 
            building meaningful connections in their communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg">
              Create Free Account
            </Button>
            <Button variant="outline" size="lg">
              Browse Skills First
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;