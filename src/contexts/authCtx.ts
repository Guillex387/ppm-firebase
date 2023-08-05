import { createContext } from 'react';
import type { User } from 'firebase/auth';

const AuthContext = createContext<User | null>(null);

export default AuthContext;
