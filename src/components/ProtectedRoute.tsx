import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const [loadingDots, setLoadingDots] = useState(".");
  const [showFallback, setShowFallback] = useState(false);

  // Animated loading dots
  useEffect(() => {
    if (!isLoading) return;
    
    const interval = setInterval(() => {
      setLoadingDots(prev => prev.length >= 3 ? "." : prev + ".");
    }, 500);
    
    // Show fallback if loading takes too long
    const fallbackTimeout = setTimeout(() => {
      setShowFallback(true);
    }, 8000);

    return () => {
      clearInterval(interval);
      clearTimeout(fallbackTimeout);
    };
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
            <span className="text-white font-bold text-2xl">S</span>
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium">Loading authentication{loadingDots}</p>
            <p className="text-sm text-muted-foreground">Please wait while we verify your session</p>
            {showFallback && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  Taking longer than expected? Try{" "}
                  <button 
                    onClick={() => window.location.reload()} 
                    className="underline hover:no-underline"
                  >
                    refreshing the page
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
