import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { supabase } from '../services/supabaseClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Helper function to thoroughly clear local cache when switching or exiting accounts
  const clearLocalUserData = () => {
    localStorage.removeItem('businessData');
    localStorage.removeItem('vyaparmitra_state');
    sessionStorage.clear();
  };

  useEffect(() => {
    let isMounted = true;

    const restoreSession = async () => {
      try {
        const activeUser = await authService.getCurrentUser();
        if (isMounted) setUser(activeUser);
      } catch (err) {
        console.error('Failed to restore Supabase auth session:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    restoreSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) {
        if (session) {
          setUser(authService.toUser(session.user));
        } else {
          setUser(null);
          clearLocalUserData();
        }
      }
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = async (credentials) => {
    setAuthError(null);
    try {
      // Clear previous user residue before attaching new credentials
      clearLocalUserData();
      const response = await authService.login(credentials);
      setUser(response.user);
      return response;
    } catch (err) {
      const message = err.message || 'Login failed. Please check your credentials.';
      setAuthError(message);
      throw err;
    }
  };

  const register = async (data) => {
    setAuthError(null);
    try {
      clearLocalUserData();
      const response = await authService.register(data);
      setUser(response.user);
      return response;
    } catch (err) {
      const message = err.message || 'Registration failed. Please try again.';
      setAuthError(message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      setAuthError(err.message || 'Logout failed. Please try again.');
    } finally {
      clearLocalUserData();
      setUser(null);
      setAuthError(null);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    authError,
    setAuthError,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};