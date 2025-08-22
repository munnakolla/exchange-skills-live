import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface Profile {
  id: string;
  email: string;
  full_name: string;
  location: string;
  bio?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: SupabaseUser | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  supabase: typeof supabase;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: {
    name: string;
    email: string;
    password: string;
    location: string;
  }) => Promise<void>;
  signOut: () => void;
  updateProfile: (userData: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const checkAuthStatus = async () => {
      try {
        console.log('Checking Supabase auth status...', window.location.origin);
        
        // Set a timeout to prevent infinite loading
        timeoutId = setTimeout(() => {
          console.log('Auth check timeout - setting loading to false');
          setIsLoading(false);
        }, 5000); // 5 second timeout
        
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          clearTimeout(timeoutId);
          setIsLoading(false);
          return;
        }
        
        if (session?.user) {
          console.log('Found existing session for user:', session.user.email);
          setUser(session.user);
          try {
            await loadUserProfile(session.user);
          } catch (profileError) {
            console.error('Error loading profile, but user is authenticated:', profileError);
            // Continue with user set even if profile fails
          }
        } else {
          console.log('No existing session found');
        }
        
        clearTimeout(timeoutId);
      } catch (error) {
        console.error('Error checking auth status:', error);
        clearTimeout(timeoutId);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
      
      if (event === 'SIGNED_IN' && session?.user) {
        console.log('User signed in, loading profile...');
        setUser(session.user);
        try {
          await loadUserProfile(session.user);
        } catch (error) {
          console.error('Error loading profile on auth change:', error);
        }
      } else if (event === 'SIGNED_OUT') {
        console.log('User signed out');
        setUser(null);
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const createUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      console.log('Creating new profile for user:', supabaseUser.email);
      
      const profileData = {
        id: supabaseUser.id,
        email: supabaseUser.email || '',
        full_name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || '',
        location: supabaseUser.user_metadata?.location || '',
        bio: '',
        avatar_url: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Add timeout for profile creation
      const createPromise = supabase
        .from('profiles')
        .insert([profileData])
        .select()
        .single();
      
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Profile creation timeout')), 3000)
      );
      
      const { data, error } = await Promise.race([
        createPromise,
        timeoutPromise
      ]) as any;

      if (error) {
        console.error('Error creating profile:', error);
        return;
      }

      if (data) {
        console.log('Profile created successfully:', data.full_name);
        setProfile(data);
      }
    } catch (error) {
      console.error('Error in createUserProfile:', error);
      // Continue without profile - user is still authenticated
    }
  };

  const loadUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      console.log('Loading profile for user:', supabaseUser.email);
      
      // Add timeout for profile loading
      const profilePromise = supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();
      
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Profile load timeout')), 3000)
      );
      
      const { data: profileData, error } = await Promise.race([
        profilePromise,
        timeoutPromise
      ]) as any;

      if (error) {
        console.error('Error loading profile:', error);
        
        // If profile doesn't exist, create it
        if (error.code === 'PGRST116') {
          console.log('Profile not found, creating new profile...');
          try {
            await createUserProfile(supabaseUser);
          } catch (createError) {
            console.error('Error creating profile:', createError);
            // Continue without profile - user is still authenticated
          }
          return;
        }
        // Continue without profile - user is still authenticated
        return;
      }

      if (profileData) {
        console.log('Profile loaded successfully:', profileData.full_name);
        setUser(supabaseUser);
        setProfile(profileData);
      }
    } catch (error) {
      console.error('Error in loadUserProfile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting to sign in with Supabase:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Supabase sign-in error:', error);
        throw error;
      }

      if (data.user) {
        console.log('Sign-in successful:', data.user.email);
        // The auth state change listener will handle setting user and loading profile
      } else {
        throw new Error('No user returned from Supabase');
      }
    } catch (error: unknown) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signUp = async ({ name, email, password, location }: {
    name: string;
    email: string;
    password: string;
    location: string;
  }) => {
    try {
      console.log('Attempting to sign up with Supabase:', email, name);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            location: location,
          },
          emailRedirectTo: `${window.location.origin}/dashboard`
        },
      });

      if (error) {
        console.error('Supabase sign-up error:', error);
        throw error;
      }

      if (data.user) {
        console.log('Sign-up successful:', data.user.email);
        
        // Check if email confirmation is required
        if (!data.user.email_confirmed_at && !data.session) {
          console.log('Email confirmation required - user needs to check email');
          // Don't throw error, just log that confirmation is needed
        } else {
          console.log('User signed up and logged in immediately');
          // The auth state change listener will handle creating the profile
        }
      }
    } catch (error: unknown) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      console.log('Signing out from Supabase...');
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Error signing out:', error);
        throw error;
      }
      
      console.log('Sign-out successful');
      // The auth state change listener will handle clearing user/profile
    } catch (error) {
      console.error('Error in signOut:', error);
      // Still clear local state even if Supabase call fails
      setUser(null);
      setProfile(null);
    }
  };

  const updateProfile = async (userData: Partial<Profile>) => {
    if (!user || !profile) return;
    
    try {
      console.log('Updating profile in Supabase:', userData);
      
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...userData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating profile:', error);
        throw error;
      }

      if (data) {
        console.log('Profile updated successfully');
        setProfile(data);
      }
    } catch (error: unknown) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    profile,
    isAuthenticated: !!user,
    isLoading,
    supabase,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
