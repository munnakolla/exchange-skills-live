import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import SkillSwapLogo from "@/components/SkillSwapLogo";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin 
} from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleSocialClick = (platform: string) => {
    // In a real app, these would be actual social media URLs
    const socialUrls = {
      facebook: "https://facebook.com/skillswap",
      twitter: "https://twitter.com/skillswap",
      instagram: "https://instagram.com/skillswap",
      linkedin: "https://linkedin.com/company/skillswap"
    };
    
    window.open(socialUrls[platform as keyof typeof socialUrls], '_blank');
  };

  const handleContactClick = (type: string, value: string) => {
    if (type === 'email') {
      window.location.href = `mailto:${value}`;
    } else if (type === 'phone') {
      window.location.href = `tel:${value}`;
    } else if (type === 'location') {
      window.open('https://maps.google.com/?q=San Francisco, CA', '_blank');
    }
  };

  const handleNewsletterSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    
    if (email) {
      // In a real app, this would send to your newsletter service
      alert(`Thank you for subscribing with ${email}! We'll keep you updated.`);
      form.reset();
    }
  };
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {/* Brand Section */}
          <div className="space-y-4 sm:space-y-6 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <SkillSwapLogo variant="white" size={40} showText={true} />
            </div>
            <p className="text-background/80 leading-relaxed text-sm sm:text-base">
              Connecting learners and teachers worldwide through peer-to-peer skill sharing. 
              Learn together, grow together.
            </p>
            <div className="flex justify-center sm:justify-start space-x-3 sm:space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-background hover:bg-background/10 hover-lift smooth-transition"
                onClick={() => handleSocialClick('facebook')}
              >
                <Facebook className="h-4 w-4 sm:h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-background hover:bg-background/10 hover-lift smooth-transition"
                onClick={() => handleSocialClick('twitter')}
              >
                <Twitter className="h-4 w-4 sm:h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-background hover:bg-background/10 hover-lift smooth-transition"
                onClick={() => handleSocialClick('instagram')}
              >
                <Instagram className="h-4 w-4 sm:h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-background hover:bg-background/10 hover-lift smooth-transition"
                onClick={() => handleSocialClick('linkedin')}
              >
                <Linkedin className="h-4 w-4 sm:h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-background">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <button 
                  onClick={() => handleNavigation('/about')} 
                  className="text-background/80 hover:text-background transition-colors text-left text-sm sm:text-base hover-lift smooth-transition"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/features')} 
                  className="text-background/80 hover:text-background transition-colors text-left text-sm sm:text-base hover-lift smooth-transition"
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/how-it-works')} 
                  className="text-background/80 hover:text-background transition-colors text-left text-sm sm:text-base hover-lift smooth-transition"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/categories')} 
                  className="text-background/80 hover:text-background transition-colors text-left text-sm sm:text-base hover-lift smooth-transition"
                >
                  Categories
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation(isAuthenticated ? '/find-partners' : '/get-started')} 
                  className="text-background/80 hover:text-background transition-colors text-left text-sm sm:text-base hover-lift smooth-transition"
                >
                  {isAuthenticated ? 'Find Partners' : 'Get Started'}
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-background">Support</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <button 
                  onClick={() => alert('Help Center - Coming soon! For now, please contact us at hello@skillswap.com')} 
                  className="text-background/80 hover:text-background transition-colors text-left text-sm sm:text-base hover-lift smooth-transition"
                >
                  Help Center
                </button>
              </li>
              <li>
                <button 
                  onClick={() => alert('Safety Guidelines:\n\n1. Meet in public places for outdoor meetups\n2. Verify user profiles before meeting\n3. Report suspicious behavior\n4. Keep personal information private\n5. Trust your instincts')} 
                  className="text-background/80 hover:text-background transition-colors text-left text-sm sm:text-base hover-lift smooth-transition"
                >
                  Safety Guidelines
                </button>
              </li>
              <li>
                <button 
                  onClick={() => alert('Community Rules:\n\n1. Be respectful and professional\n2. Share knowledge genuinely\n3. Honor your commitments\n4. Provide constructive feedback\n5. Keep the platform positive and inclusive')} 
                  className="text-background/80 hover:text-background transition-colors text-left text-sm sm:text-base hover-lift smooth-transition"
                >
                  Community Rules
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleContactClick('email', 'hello@skillswap.com')} 
                  className="text-background/80 hover:text-background transition-colors text-left text-sm sm:text-base hover-lift smooth-transition"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => alert('To report an issue:\n\n1. Email us at hello@skillswap.com\n2. Include detailed description\n3. Provide screenshots if applicable\n4. We will respond within 24 hours')} 
                  className="text-background/80 hover:text-background transition-colors text-left text-sm sm:text-base hover-lift smooth-transition"
                >
                  Report Issue
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-background">Get in Touch</h4>
            <div className="space-y-3 sm:space-y-4">
              <div 
                className="flex items-center justify-center sm:justify-start space-x-3 cursor-pointer hover:text-background transition-colors hover-lift smooth-transition"
                onClick={() => handleContactClick('email', 'hello@skillswap.com')}
              >
                <Mail className="h-4 w-4 sm:h-5 w-5 text-background/60" />
                <span className="text-background/80 text-sm sm:text-base">hello@skillswap.com</span>
              </div>
              <div 
                className="flex items-center justify-center sm:justify-start space-x-3 cursor-pointer hover:text-background transition-colors hover-lift smooth-transition"
                onClick={() => handleContactClick('phone', '+1-555-123-4567')}
              >
                <Phone className="h-4 w-4 sm:h-5 w-5 text-background/60" />
                <span className="text-background/80 text-sm sm:text-base">+1 (555) 123-4567</span>
              </div>
              <div 
                className="flex items-center justify-center sm:justify-start space-x-3 cursor-pointer hover:text-background transition-colors hover-lift smooth-transition"
                onClick={() => handleContactClick('location', 'San Francisco, CA')}
              >
                <MapPin className="h-4 w-4 sm:h-5 w-5 text-background/60" />
                <span className="text-background/80 text-sm sm:text-base">San Francisco, CA</span>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="font-semibold mb-3 text-background text-sm sm:text-base">Newsletter</h5>
              <p className="text-xs sm:text-sm text-background/80 mb-4">
                Get the latest updates and skill-sharing tips.
              </p>
              <form onSubmit={handleNewsletterSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-3 py-2 rounded-lg bg-background/10 border border-background/20 text-background placeholder:text-background/60 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <Button type="submit" variant="secondary" size="sm" className="hover-lift smooth-transition">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/80 text-xs sm:text-sm text-center md:text-left">
              © 2024 SkillSwap. All rights reserved.
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm">
              <button 
                onClick={() => alert('Privacy Policy:\n\nWe protect your personal information and only use it to facilitate skill exchanges. We do not sell your data to third parties.')} 
                className="text-background/80 hover:text-background transition-colors hover-lift smooth-transition"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => alert('Terms of Service:\n\n1. Use the platform respectfully\n2. Honor your skill exchange commitments\n3. Report inappropriate behavior\n4. We reserve the right to suspend accounts for violations')} 
                className="text-background/80 hover:text-background transition-colors hover-lift smooth-transition"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => alert('Cookie Policy:\n\nWe use essential cookies to improve your experience and remember your preferences. No tracking cookies are used.')} 
                className="text-background/80 hover:text-background transition-colors hover-lift smooth-transition"
              >
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;