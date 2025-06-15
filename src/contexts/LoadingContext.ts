import { createContext } from 'react';

interface LoadingContextType {
    setIsLoading: (loading: boolean) => void;
}

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);
