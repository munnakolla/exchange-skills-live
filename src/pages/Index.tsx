import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CategoriesSection from "@/components/CategoriesSection";
import Footer from "@/components/Footer";
import DashboardWelcome from "@/components/DashboardWelcome";
import { LoadingState } from "@/components/ui/loading";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="space-y-4 text-center bounce-in">
            <LoadingState 
              isLoading={true}
              fallback={
                <div className="space-y-4 text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
                  <p className="text-muted-foreground text-lg">Loading authentication...</p>
                </div>
              }
            >
              {null}
            </LoadingState>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="smooth-transition">        
        {isAuthenticated ? (
          // Authenticated user sees dashboard welcome
          <div className="bounce-in">
            <DashboardWelcome />
          </div>
        ) : (
          // Unauthenticated users see the marketing content
          <div className="space-y-8">
            <div className="bounce-in">
              <HeroSection />
            </div>
            <div id="features" className="slide-up">
              <FeaturesSection />
            </div>
            <div id="how-it-works" className="slide-up">
              <HowItWorksSection />
            </div>
            <div id="categories" className="slide-up">
              <CategoriesSection />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
