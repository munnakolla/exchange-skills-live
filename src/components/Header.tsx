import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="text-2xl font-bold gradient-text">SkillSwap</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-foreground hover:text-primary transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">
            How It Works
          </a>
          <a href="#categories" className="text-foreground hover:text-primary transition-colors">
            Categories
          </a>
          <a href="#about" className="text-foreground hover:text-primary transition-colors">
            About
          </a>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost">Sign In</Button>
          <Button variant="hero">Get Started</Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border md:hidden">
            <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              <a href="#features" className="text-foreground hover:text-primary transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">
                How It Works
              </a>
              <a href="#categories" className="text-foreground hover:text-primary transition-colors">
                Categories
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">
                About
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="ghost">Sign In</Button>
                <Button variant="hero">Get Started</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;