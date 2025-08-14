import { Button } from "@/components/ui/button";
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
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold text-background">SkillSwap</span>
            </div>
            <p className="text-background/80 leading-relaxed">
              Connecting learners and teachers worldwide through peer-to-peer skill sharing. 
              Learn together, grow together.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-background hover:bg-background/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:bg-background/10">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:bg-background/10">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:bg-background/10">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-background">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-background/80 hover:text-background transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-background/80 hover:text-background transition-colors">How It Works</a></li>
              <li><a href="#categories" className="text-background/80 hover:text-background transition-colors">Categories</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Pricing</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Success Stories</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-background">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Help Center</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Safety Guidelines</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Community Rules</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Report Issue</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-background">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-background/60" />
                <span className="text-background/80">hello@skillswap.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-background/60" />
                <span className="text-background/80">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-background/60" />
                <span className="text-background/80">San Francisco, CA</span>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="font-semibold mb-3 text-background">Newsletter</h5>
              <p className="text-sm text-background/80 mb-4">
                Get the latest updates and skill-sharing tips.
              </p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 rounded-lg bg-background/10 border border-background/20 text-background placeholder:text-background/60 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button variant="secondary" size="sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/80 text-sm">
              © 2024 SkillSwap. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-background/80 hover:text-background transition-colors">Privacy Policy</a>
              <a href="#" className="text-background/80 hover:text-background transition-colors">Terms of Service</a>
              <a href="#" className="text-background/80 hover:text-background transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;