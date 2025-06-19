import { createContext } from 'react';

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signUp: (username: string, email: string, password: string) => Promise<AuthResponse>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
  signIn: async () => ({ message: '', token: '', user: { id: '', username: '', email: '' } }),
  signUp: async () => ({ message: '', token: '', user: { id: '', username: '', email: '' } }),
  signOut: () => {},
});
