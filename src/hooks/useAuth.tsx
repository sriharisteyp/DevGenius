import { useState, useEffect } from 'react';
import authService from '../services/auth.service';
import { AuthContext, type User } from '../contexts/AuthContext';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Check if there's a stored token and try to get user info
    const token = authService.getToken();
    if (token) {
      // You would typically make an API call here to validate the token
      // and get user info. For now, we'll just set loading to false
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    const response = await authService.login(email, password);
    if (response.user) {
      setUser(response.user);
    }
  };

  const signUp = async (username: string, email: string, password: string) => {
    try {
      const response = await authService.register(username, email, password);
      if (response.user) {
        setUser(response.user);
      }
      // We might want to handle verification flow here if needed
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };


  const signOut = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,

    signIn,
    signUp,

    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


