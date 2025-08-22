import { Button } from "@/components/ui/button";
import { ArrowRight, Users, BookOpen, Star, Code, Palette, Music, Languages } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
const HeroSection = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <section className="min-h-screen flex items-center pt-16 sm:pt-20 pb-12 sm:pb-16 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Learn <span className="gradient-text">Together</span>,
                <br />
                Grow <span className="gradient-text">Together</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Connect with skilled individuals in your community. Exchange knowledge, 
                share expertise, and build meaningful learning relationships without 
                monetary barriers.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              <div className="text-center interactive-card p-3 sm:p-4 rounded-lg hover-lift smooth-transition">
                <div className="flex items-center justify-center mb-1 sm:mb-2">
                  <Users className="h-4 w-4 sm:h-5 w-5 md:h-6 w-6 text-primary mr-1 sm:mr-2" />
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary">10K+</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">Active Learners</p>
              </div>
              <div className="text-center interactive-card p-3 sm:p-4 rounded-lg hover-lift smooth-transition">
                <div className="flex items-center justify-center mb-1 sm:mb-2">
                  <BookOpen className="h-4 w-4 sm:h-5 w-5 md:h-6 w-6 text-secondary mr-1 sm:mr-2" />
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-secondary">500+</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">Skills Available</p>
              </div>
              <div className="text-center interactive-card p-3 sm:p-4 rounded-lg hover-lift smooth-transition">
                <div className="flex items-center justify-center mb-1 sm:mb-2">
                  <Star className="h-4 w-4 sm:h-5 w-5 md:h-6 w-6 text-accent mr-1 sm:mr-2" />
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-accent">4.9</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">Average Rating</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="lg" className="group hover-lift smooth-transition w-full sm:w-auto" asChild>
                <Link to={isAuthenticated ? "/dashboard" : "/get-started"}>
                  {isAuthenticated ? "Go to Dashboard" : "Start Learning"}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="hover-lift smooth-transition w-full sm:w-auto" asChild>
                <Link to={isAuthenticated ? "/dashboard" : "/get-started"}>
                  {isAuthenticated ? "Find Skills" : "Become a Teacher"}
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Visual - Icon-based Design */}
          <div className="relative mt-8 lg:mt-0">
            {/* Main gradient background */}
            <div className="relative rounded-2xl overflow-hidden shadow-strong h-[400px] sm:h-[500px] md:h-[600px] bg-gradient-hero flex items-center justify-center">
              {/* Animated skill icons grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 p-6 sm:p-8 md:p-12">
                <div className="flex flex-col items-center space-y-2 sm:space-y-3 md:space-y-4 floating-animation">
                  <div className="w-12 h-12 sm:w-16 h-16 md:w-20 h-20 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center">
                    <Code className="h-6 w-6 sm:h-8 w-8 md:h-10 w-10 text-white" />
                  </div>
                  <span className="text-white/80 font-medium text-xs sm:text-sm">Programming</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2 sm:space-y-3 md:space-y-4 floating-animation" style={{ animationDelay: '1s' }}>
                  <div className="w-12 h-12 sm:w-16 h-16 md:w-20 h-20 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center">
                    <Palette className="h-6 w-6 sm:h-8 w-8 md:h-10 w-10 text-white" />
                  </div>
                  <span className="text-white/80 font-medium text-xs sm:text-sm">Design</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2 sm:space-y-3 md:space-y-4 floating-animation" style={{ animationDelay: '2s' }}>
                  <div className="w-12 h-12 sm:w-16 h-16 md:w-20 h-20 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center">
                    <Music className="h-6 w-6 sm:h-8 w-8 md:h-10 w-10 text-white" />
                  </div>
                  <span className="text-white/80 font-medium text-xs sm:text-sm">Music</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2 sm:space-y-3 md:space-y-4 floating-animation" style={{ animationDelay: '0.5s' }}>
                  <div className="w-12 h-12 sm:w-16 h-16 md:w-20 h-20 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center">
                    <Languages className="h-6 w-6 sm:h-8 w-8 md:h-10 w-10 text-white" />
                  </div>
                  <span className="text-white/80 font-medium text-xs sm:text-sm">Languages</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2 sm:space-y-3 md:space-y-4 floating-animation" style={{ animationDelay: '1.5s' }}>
                  <div className="w-12 h-12 sm:w-16 h-16 md:w-20 h-20 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center">
                    <BookOpen className="h-6 w-6 sm:h-8 w-8 md:h-10 w-10 text-white" />
                  </div>
                  <span className="text-white/80 font-medium text-xs sm:text-sm">Academic</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2 sm:space-y-3 md:space-y-4 floating-animation hidden sm:flex" style={{ animationDelay: '2.5s' }}>
                  <div className="w-12 h-12 sm:w-16 h-16 md:w-20 h-20 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center">
                    <Users className="h-6 w-6 sm:h-8 w-8 md:h-10 w-10 text-white" />
                  </div>
                  <span className="text-white/80 font-medium text-xs sm:text-sm">Business</span>
                </div>
              </div>
              
              {/* Overlay effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </div>
            
            {/* Floating notification cards - Hidden on mobile for cleaner look */}
            <div className="hidden md:block absolute -top-6 -left-6 bg-card p-4 rounded-xl shadow-medium border border-card-border floating-animation">
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

            <div className="hidden md:block absolute -bottom-6 -right-6 bg-card p-4 rounded-xl shadow-medium border border-card-border floating-animation" style={{ animationDelay: '2s' }}>
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

            <div className="hidden lg:block absolute top-1/2 -left-4 bg-card p-3 rounded-xl shadow-medium border border-card-border floating-animation" style={{ animationDelay: '3s' }}>
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