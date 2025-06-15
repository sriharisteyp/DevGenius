import React, { useState, useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import Loader from '@/components/ui/loader';
import { LoadingContext } from '@/contexts/LoadingContext';

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {  const [isLoading, setIsLoading] = useState(true);
  const [currentChildren, setCurrentChildren] = useState(children);
  const location = useLocation();
  const navigationType = useNavigationType();

  // Only handle initial page load
  useEffect(() => {
    // Check if this is an initial load or refresh
    const isInitialLoad = navigationType === 'PUSH' && location.pathname === window.location.pathname;
    const isRefresh = navigationType === 'POP' && performance.navigation.type === 1;

    if (isInitialLoad || isRefresh) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        setCurrentChildren(children);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      // For route changes, immediately show content without loader
      setIsLoading(false);
      setCurrentChildren(children);
    }
  }, [children, location.pathname, navigationType]);

  return (
    <LoadingContext.Provider value={{ setIsLoading }}>
      {isLoading && <Loader />}
      <div 
        style={{ 
          opacity: isLoading ? 0 : 1, 
          transition: 'opacity 0.3s ease-in-out',
          visibility: isLoading ? 'hidden' : 'visible',
          position: isLoading ? 'fixed' : 'relative'
        }}
      >
        {currentChildren}
      </div>
    </LoadingContext.Provider>
  );
};
