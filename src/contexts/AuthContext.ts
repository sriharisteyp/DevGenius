import { createContext } from 'react';

export interface User {
    username: string;
    email: string;
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    pendingVerification: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (username: string, email: string, password: string) => Promise<void>;
    verifyOTP: (email: string, otp: string, username: string, password: string) => Promise<void>;
    signOut: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    pendingVerification: false,
    signIn: async () => { },
    signUp: async () => { },
    verifyOTP: async () => { },
    signOut: () => { },
});
