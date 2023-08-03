import { createContext } from 'react';
import app from './firebase';
import { getAuth, type User } from 'firebase/auth';

const auth = getAuth(app);

export const AuthContext = createContext<User | null>(null);

export default auth;
