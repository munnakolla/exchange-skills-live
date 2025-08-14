import { Button } from "@/components/ui/button";
import { ArrowRight, Users, BookOpen, Star, Code, Palette, Music, Languages } from "lucide-react";
const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center pt-20 pb-16 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Learn <span className="gradient-text">Together</span>,
                <br />
                Grow <span className="gradient-text">Together</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Connect with skilled individuals in your community. Exchange knowledge, 
                share expertise, and build meaningful learning relationships without 
                monetary barriers.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-primary mr-2" />
                  <span className="text-2xl font-bold text-primary">10K+</span>
                </div>
                <p className="text-sm text-muted-foreground">Active Learners</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <BookOpen className="h-6 w-6 text-secondary mr-2" />
                  <span className="text-2xl font-bold text-secondary">500+</span>
                </div>
                <p className="text-sm text-muted-foreground">Skills Available</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-6 w-6 text-accent mr-2" />
                  <span className="text-2xl font-bold text-accent">4.9</span>
                </div>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                Start Learning
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Become a Teacher
              </Button>
            </div>
          </div>

          {/* Right Visual - Icon-based Design */}
          <div className="relative">
            {/* Main gradient background */}
            <div className="relative rounded-2xl overflow-hidden shadow-strong h-[600px] bg-gradient-hero flex items-center justify-center">
              {/* Animated skill icons grid */}
              <div className="grid grid-cols-3 gap-8 p-12">
                <div className="flex flex-col items-center space-y-4 floating-animation">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Code className="h-10 w-10 text-white" />
                  </div>
                  <span className="text-white/80 font-medium">Programming</span>
                </div>
                
                <div className="flex flex-col items-center space-y-4 floating-animation" style={{ animationDelay: '1s' }}>
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Palette className="h-10 w-10 text-white" />
                  </div>
                  <span className="text-white/80 font-medium">Design</span>
                </div>
                
                <div className="flex flex-col items-center space-y-4 floating-animation" style={{ animationDelay: '2s' }}>
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Music className="h-10 w-10 text-white" />
                  </div>
                  <span className="text-white/80 font-medium">Music</span>
                </div>
                
                <div className="flex flex-col items-center space-y-4 floating-animation" style={{ animationDelay: '0.5s' }}>
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Languages className="h-10 w-10 text-white" />
                  </div>
                  <span className="text-white/80 font-medium">Languages</span>
                </div>
                
                <div className="flex flex-col items-center space-y-4 floating-animation" style={{ animationDelay: '1.5s' }}>
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <BookOpen className="h-10 w-10 text-white" />
                  </div>
                  <span className="text-white/80 font-medium">Academic</span>
                </div>
                
                <div className="flex flex-col items-center space-y-4 floating-animation" style={{ animationDelay: '2.5s' }}>
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <span className="text-white/80 font-medium">Business</span>
                </div>
              </div>
              
              {/* Overlay effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </div>
            
            {/* Floating notification cards */}
            <div className="absolute -top-6 -left-6 bg-card p-4 rounded-xl shadow-medium border border-card-border floating-animation">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Music className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Guitar Lessons</p>
                  <p className="text-xs text-muted-foreground">Sarah M.</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-card p-4 rounded-xl shadow-medium border border-card-border floating-animation" style={{ animationDelay: '2s' }}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center">
                  <Code className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Coding Bootcamp</p>
                  <p className="text-xs text-muted-foreground">Mike R.</p>
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 -left-4 bg-card p-3 rounded-xl shadow-medium border border-card-border floating-animation" style={{ animationDelay: '3s' }}>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center">
                  <Languages className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-xs">Spanish</p>
                  <p className="text-xs text-muted-foreground">Alex K.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;