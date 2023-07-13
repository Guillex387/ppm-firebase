import { useEffect, useState } from 'react';
import auth from './lib/auth';
import { User, onAuthStateChanged } from 'firebase/auth';

export const useAuth = (): User | null => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return unSubscribe;
  }, []);

  return user;
};
