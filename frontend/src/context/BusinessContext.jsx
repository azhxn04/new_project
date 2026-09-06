import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const BusinessContext = createContext(null);
const STORAGE_PREFIX = 'vyaparmitra_business_state_v1_';

const EMPTY_BUSINESS = {
  businessType: '',
  location: {
    city: '',
    state: '',
    locality: '',
  },
  capital: '',
  onboardingComplete: false,
  feasibility: null,
  finance: null,
  advisorChat: [],
};

const getStorageKey = (userId) => `${STORAGE_PREFIX}${userId}`;

export const BusinessProvider = ({ children }) => {
  const { user } = useAuth();
  const [business, setBusiness] = useState(EMPTY_BUSINESS);
  const [loading, setLoading] = useState(true);

  // Core effect to load user-specific business state on user change/login
  useEffect(() => {
    setLoading(true);

    // Explicitly reset if no user is present (happens on logout)
    if (!user?.id) {
      setBusiness(EMPTY_BUSINESS);
      setLoading(false);
      return;
    }

    try {
      const storedData = localStorage.getItem(getStorageKey(user.id));
      if (storedData) {
        setBusiness((prev) => ({
          ...EMPTY_BUSINESS,
          ...JSON.parse(storedData),
        }));
      } else {
        // If no stored data exists for THIS user, initialize fresh from onboarding defaults
        setBusiness({
          ...EMPTY_BUSINESS,
          // Prefill businessType if the user provided one during registration
          businessType: user.businessName || '',
        });
      }
    } catch (err) {
      console.error('Failed to parse stored business data:', err);
      setBusiness(EMPTY_BUSINESS);
    } finally {
      setLoading(false);
    }
  }, [user?.id]); // Re-run whenever user ID changes

  // Consolidated update function to merge new data and persist it immediately
  const updateBusiness = (newData) => {
    setBusiness((prev) => {
      const updatedBusiness = { ...prev, ...newData };

      // Persist the updated state to the user-specific storage key
      if (user?.id) {
        try {
          localStorage.setItem(getStorageKey(user.id), JSON.stringify(updatedBusiness));
        } catch (err) {
          console.error('Failed to save business data to localStorage:', err);
        }
      }
      return updatedBusiness;
    });
  };

  // Helper function specifically for completing the onboarding phase
  const saveOnboardingData = (onboardingData) => {
    const onboardingCompleteData = {
      ...onboardingData,
      // Merge locations carefully
      location: {
        ...EMPTY_BUSINESS.location,
        ...onboardingData.location,
      },
      onboardingComplete: true,
    };
    updateBusiness(onboardingCompleteData);
  };

  // Helper function to update analysis results (feasibility, SWOT, finance)
  const saveAnalysisResults = (results) => {
    updateBusiness(results);
  };

  // Helper function to persist advisor chat context
  const saveAdvisorChatContext = (chatMessages) => {
    updateBusiness({ advisorChat: chatMessages });
  };

  const value = {
    ...business, // Spread all properties (businessType, feasibility, etc.) for direct access
    business, // Full object access if needed
    loading,
    updateBusiness,
    saveOnboardingData,
    saveAnalysisResults,
    saveAdvisorChatContext,
  };

  return <BusinessContext.Provider value={value}>{children}</BusinessContext.Provider>;
};

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
};