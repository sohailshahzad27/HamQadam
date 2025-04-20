import { User } from 'firebase/auth';

export interface UserProfile {
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: string;
  // Add additional fields as needed
}

export interface AuthContextType {
  currentUser: User | null;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}