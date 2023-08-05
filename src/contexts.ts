import { createContext } from 'react';
import type { User } from 'firebase/auth';

export const AuthContext = createContext<User | null>(null);
