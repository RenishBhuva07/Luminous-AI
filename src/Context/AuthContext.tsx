import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { DeviceEventEmitter } from 'react-native';
import AuthHelper from '../api/helpers/AuthHelper';
import AuthController from '../api/controllers/AuthController';

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  emailVerified: boolean;
  profileCompleted: boolean;
}

interface AuthContextType {
  isLoading: boolean;
  user: User | null;
  isAuthenticated: boolean;
  requiresProfileCompletion: boolean;
  setAuthState: (user: User, requiresProfileCompletion: boolean) => void;
  updateUser: (user: Partial<User>) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  isLoading: true,
  user: null,
  isAuthenticated: false,
  requiresProfileCompletion: false,
  setAuthState: () => {},
  updateUser: () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [requiresProfileCompletion, setRequiresProfileCompletion] =
    useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const accessToken = await AuthHelper.getAccessToken();
        if (accessToken) {
          const res = await AuthController.getProfile();
          if (res.success && res.data?.user) {
            setUser(res.data.user);
          }
        }
      } catch (error) {
        console.error('Failed to check auth status', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const setAuthState = (userData: User, reqProfileCompletion: boolean) => {
    setUser(userData);
    setRequiresProfileCompletion(reqProfileCompletion);
  };

  const updateUser = (userData: Partial<User>) => {
    setUser(prev => (prev ? { ...prev, ...userData } : null));
  };

  const logout = async () => {
    await AuthController.logout();
    setUser(null);
    setRequiresProfileCompletion(false);
  };

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener('force_logout', () => {
      logout();
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        user,
        isAuthenticated: !!user,
        requiresProfileCompletion,
        setAuthState,
        updateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
