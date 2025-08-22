import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import SkillSwapLogo from "@/components/SkillSwapLogo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, isAuthenticated, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-2 sm:py-3 lg:py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center space-x-2">
            <SkillSwapLogo size={44} showText={true} />
          </Link>
        </div>

        {/* Desktop Navigation - Show different nav for authenticated vs unauthenticated users */}
        <nav className="hidden md:flex items-center space-x-8">
          {isAuthenticated ? (
            /* Authenticated user navigation */
            <>
              <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors hover-lift smooth-transition px-3 py-2 rounded-md bg-background/20 hover:bg-background/30">
                Dashboard
              </Link>
              <Link to="/my-skills" className="text-foreground hover:text-primary transition-colors hover-lift smooth-transition px-3 py-2 rounded-md bg-background/20 hover:bg-background/30">
                My Skills
              </Link>
              <Link to="/find-partners" className="text-foreground hover:text-primary transition-colors hover-lift smooth-transition px-3 py-2 rounded-md bg-background/20 hover:bg-background/30">
                Find Partners
              </Link>
              <Link to="/sessions" className="text-foreground hover:text-primary transition-colors hover-lift smooth-transition px-3 py-2 rounded-md bg-background/20 hover:bg-background/30">
                My Sessions
              </Link>
              <Link to="/messages" className="text-foreground hover:text-primary transition-colors hover-lift smooth-transition px-3 py-2 rounded-md bg-background/20 hover:bg-background/30">
                Messages
              </Link>
            </>
          ) : (
            /* Unauthenticated user navigation */
            <>
              <a href="#features" className="text-foreground hover:text-primary transition-colors hover-lift smooth-transition px-3 py-2 rounded-md bg-background/20 hover:bg-background/30">
                Features
              </a>
              <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors hover-lift smooth-transition px-3 py-2 rounded-md bg-background/20 hover:bg-background/30">
                How It Works
              </a>
              <a href="#categories" className="text-foreground hover:text-primary transition-colors hover-lift smooth-transition px-3 py-2 rounded-md bg-background/20 hover:bg-background/30">
                Categories
              </a>
              <Link to="/about" className="text-foreground hover:text-primary transition-colors hover-lift smooth-transition px-3 py-2 rounded-md bg-background/20 hover:bg-background/30">
                About
              </Link>
            </>
          )}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:!rounded-full hover-lift smooth-transition">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={profile?.avatar_url} alt={profile?.full_name} />
                    <AvatarFallback>
                      {profile?.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{profile?.full_name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" className="hover-lift smooth-transition" asChild>
                <Link to="/sign-in">Sign In</Link>
              </Button>
              <Button variant="hero" className="hover-lift smooth-transition" asChild>
                <Link to="/get-started">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover-lift smooth-transition rounded-lg hover:bg-accent"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border md:hidden shadow-lg">
            <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              {/* Mobile Navigation - Show different nav for authenticated vs unauthenticated users */}
              {isAuthenticated ? (
                /* Authenticated user mobile navigation */
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md bg-background/20 hover:bg-background/30 hover-lift smooth-transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/my-skills" 
                    className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md bg-background/20 hover:bg-background/30 hover-lift smooth-transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Skills
                  </Link>
                  <Link 
                    to="/find-partners" 
                    className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md bg-background/20 hover:bg-background/30 hover-lift smooth-transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Find Partners
                  </Link>
                  <Link 
                    to="/sessions" 
                    className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md bg-background/20 hover:bg-background/30 hover-lift smooth-transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Sessions
                  </Link>
                  <Link 
                    to="/messages" 
                    className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md bg-background/20 hover:bg-background/30 hover-lift smooth-transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Messages
                  </Link>
                </>
              ) : (
                /* Unauthenticated user mobile navigation */
                <>
                  <a href="#features" className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md bg-background/20 hover:bg-background/30 hover-lift smooth-transition">
                    Features
                  </a>
                  <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md bg-background/20 hover:bg-background/30 hover-lift smooth-transition">
                    How It Works
                  </a>
                  <a href="#categories" className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md bg-background/20 hover:bg-background/30 hover-lift smooth-transition">
                    Categories
                  </a>
                  <Link 
                    to="/about" 
                    className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md bg-background/20 hover:bg-background/30 hover-lift smooth-transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </Link>
                </>
              )}
              <div className="flex flex-col space-y-3 pt-4">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 px-3 py-3 bg-muted rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={profile?.avatar_url} alt={profile?.full_name} />
                        <AvatarFallback className="text-sm">
                          {profile?.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {profile?.full_name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" className="w-full justify-start hover-lift smooth-transition" asChild>
                      <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start hover-lift smooth-transition" onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Button variant="ghost" className="w-full hover-lift smooth-transition" asChild>
                      <Link to="/sign-in" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                    </Button>
                    <Button variant="hero" className="w-full hover-lift smooth-transition" asChild>
                      <Link to="/get-started" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;