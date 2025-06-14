
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

interface ApiKeys {
  gemini?: string;
}

export const useApiKeys = () => {
  const [apiKeys, setApiKeys] = useState<ApiKeys>({});
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchApiKeys();
    } else {
      setApiKeys({});
    }
  }, [user]);

  const fetchApiKeys = async () => {
    if (!user) return;

    try {
      // Use localStorage with user-specific key
      const stored = localStorage.getItem(`api_keys_${user.id}`);
      if (stored) {
        const keys = JSON.parse(stored);
        setApiKeys(keys);
      }
    } catch (error) {
      console.error('Error fetching API keys:', error);
    }
  };

  const saveApiKey = async (provider: string, apiKey: string) => {
    if (!user) throw new Error('User not authenticated');

    setLoading(true);
    try {
      const newKeys = {
        ...apiKeys,
        [provider]: apiKey,
      };
      
      // Save to localStorage with user-specific key
      localStorage.setItem(`api_keys_${user.id}`, JSON.stringify(newKeys));
      setApiKeys(newKeys);
    } catch (error) {
      console.error('Error saving API key:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeApiKey = async (provider: string) => {
    if (!user) throw new Error('User not authenticated');

    setLoading(true);
    try {
      const newKeys = { ...apiKeys };
      delete newKeys[provider as keyof ApiKeys];
      
      // Update localStorage
      localStorage.setItem(`api_keys_${user.id}`, JSON.stringify(newKeys));
      setApiKeys(newKeys);
    } catch (error) {
      console.error('Error removing API key:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    apiKeys,
    loading,
    saveApiKey,
    removeApiKey,
    refetch: fetchApiKeys,
  };
};
