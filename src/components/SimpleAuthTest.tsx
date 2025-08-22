import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const SimpleAuthTest = () => {
  const { isAuthenticated, isLoading, user, signIn, signOut } = useAuth();
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleTestLogin = async () => {
    try {
      setIsSigningIn(true);
      await signIn(email, password);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsSigningIn(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading auth...</div>;
  }

  return (
    <Card className="p-8 bg-gray-100 rounded-lg mb-6">
      <h2 className="text-2xl font-bold mb-4">🔐 Authentication Test Panel</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <p><strong>Is Authenticated:</strong> <span className={isAuthenticated ? 'text-green-600' : 'text-red-600'}>{isAuthenticated ? 'YES ✅' : 'NO ❌'}</span></p>
          <p><strong>Is Loading:</strong> {isLoading ? 'YES' : 'NO'}</p>
          <p><strong>User Email:</strong> {user?.email || 'No user'}</p>
        </div>
        
        {!isAuthenticated ? (
          <div className="space-y-4">
            <div className="p-4 bg-blue-100 rounded">
              <h3 className="text-lg font-semibold text-blue-800">👋 Welcome, Guest!</h3>
              <p className="text-blue-700 mb-4">Please log in to see the skill search functionality.</p>
              
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button 
                  onClick={handleTestLogin} 
                  disabled={isSigningIn}
                  className="w-full"
                >
                  {isSigningIn ? 'Signing In...' : 'Test Login'}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-green-100 rounded">
              <h3 className="text-lg font-semibold text-green-800">🎉 User is logged in!</h3>
              <p className="text-green-700 mb-4">The skill search should appear below.</p>
              <Button onClick={signOut} variant="outline">
                Sign Out
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SimpleAuthTest;
