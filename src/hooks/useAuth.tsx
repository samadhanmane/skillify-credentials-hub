
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserData | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithOTP: (email: string) => Promise<void>;
  verifyOTP: (email: string, otp: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (token: string, newPassword: string) => Promise<void>;
}

interface UserData {
  id: string;
  email: string;
  name: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserData | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('preskilet_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('preskilet_user');
      }
    }
  }, []);

  // Mock login function - in a real app, this would call an API
  const login = async (email: string, password: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation - in production this would be handled by a backend
      if (email === 'demo@example.com' && password === 'password') {
        const userData = { id: '1', email, name: 'Demo User' };
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('preskilet_user', JSON.stringify(userData));
        toast.success('Logged in successfully');
      } else {
        toast.error('Invalid email or password');
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      // Simulate API call for Google login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In production, this would use Firebase Auth or another provider
      const userData = { id: '2', email: 'google@example.com', name: 'Google User' };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('preskilet_user', JSON.stringify(userData));
      toast.success('Logged in with Google successfully');
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Failed to login with Google');
      throw error;
    }
  };

  const loginWithOTP = async (email: string) => {
    try {
      // Simulate sending OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In production, this would send an actual OTP via email/SMS
      toast.success(`OTP sent to ${email}. For demo, use 123456`);
      // Store email for verification step
      sessionStorage.setItem('otpEmail', email);
    } catch (error) {
      console.error('OTP request error:', error);
      toast.error('Failed to send OTP');
      throw error;
    }
  };

  const verifyOTP = async (email: string, otp: string) => {
    try {
      // Simulate API verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo verification - always accept 123456
      if (otp === '123456') {
        const userData = { id: '3', email, name: 'OTP User' };
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('preskilet_user', JSON.stringify(userData));
        sessionStorage.removeItem('otpEmail');
        toast.success('OTP verified successfully');
      } else {
        toast.error('Invalid OTP');
        throw new Error('Invalid OTP');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In production, this would create a user in the database
      const userData = { id: Math.random().toString(36).substr(2, 9), email, name };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('preskilet_user', JSON.stringify(userData));
      toast.success('Account created successfully');
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Failed to create account');
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('preskilet_user');
    toast.info('Logged out successfully');
  };

  const resetPassword = async (email: string) => {
    try {
      // Simulate API call to send reset email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In production, this would send an actual email with a reset link
      toast.success(`Password reset link sent to ${email}`);
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error('Failed to send reset link');
      throw error;
    }
  };

  const updatePassword = async (token: string, newPassword: string) => {
    try {
      // Simulate API call to update password
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In production, this would verify the token and update the password
      toast.success('Password updated successfully');
    } catch (error) {
      console.error('Password update error:', error);
      toast.error('Failed to update password');
      throw error;
    }
  };

  const value = {
    isAuthenticated,
    user,
    login,
    loginWithGoogle,
    loginWithOTP,
    verifyOTP,
    signup,
    logout,
    resetPassword,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
