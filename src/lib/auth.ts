import { createContext } from 'react';
import app from './firebase';
import { getAuth, User } from 'firebase/auth';

// TODO
// interface AuthContextI {
//   user?: User;
//   isAuth: boolean;
//   setUser: (user: User) => void;
// }

const auth = getAuth(app);

// TODO
// export const AuthContext = createContext<AuthContextI>({
//   isAuth: false,
//   setUser: () => {},
// });

export default auth;
