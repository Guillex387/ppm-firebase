import { createContext } from 'react';

interface AuthContextI {
  auth: boolean;
  setAuth: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextI>({
  auth: false,
  setAuth: (value) => {},
});

export default AuthContext;
