import { Button } from "@/components/ui/button";
import { ArrowRight, Users, BookOpen, Star } from "lucide-react";
import heroImage from "@/assets/hero-skillswap.jpg";

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

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-strong">
              <img
                src={heroImage}
                alt="People learning and teaching skills together"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            
            {/* Floating cards */}
            <div className="absolute -top-6 -left-6 bg-card p-4 rounded-xl shadow-medium border border-card-border floating-animation">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">🎸</span>
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
                  <span className="text-white text-sm font-bold">💻</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Coding Bootcamp</p>
                  <p className="text-xs text-muted-foreground">Mike R.</p>
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