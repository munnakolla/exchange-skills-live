import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AuthDebug: React.FC = () => {
  const { user, profile, isAuthenticated, isLoading } = useAuth();

  // Only show in development
  if (import.meta.env.PROD) return null;

  return (
    <Card className="fixed top-4 right-4 w-80 z-50 bg-white/95 backdrop-blur border shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Auth Debug Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span>Loading:</span>
          <Badge variant={isLoading ? "destructive" : "secondary"}>
            {isLoading ? "Yes" : "No"}
          </Badge>
        </div>
        <div className="flex justify-between">
          <span>Authenticated:</span>
          <Badge variant={isAuthenticated ? "default" : "destructive"}>
            {isAuthenticated ? "Yes" : "No"}
          </Badge>
        </div>
        <div className="flex justify-between">
          <span>User:</span>
          <Badge variant={user ? "default" : "outline"}>
            {user ? user.email?.slice(0, 10) + '...' : "None"}
          </Badge>
        </div>
        <div className="flex justify-between">
          <span>Profile:</span>
          <Badge variant={profile ? "default" : "outline"}>
            {profile ? profile.full_name?.slice(0, 10) + '...' : "None"}
          </Badge>
        </div>
        <div className="flex justify-between">
          <span>URL:</span>
          <Badge variant="outline" className="text-xs">
            {window.location.hostname}
          </Badge>
        </div>
        <div className="text-xs text-gray-500 mt-2">
          LocalStorage: {localStorage.getItem('supabase.auth.token') ? 'Has token' : 'No token'}
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthDebug;
