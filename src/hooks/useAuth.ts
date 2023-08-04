import { type User, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import auth from '../lib/auth';

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unSubscribe;
  }, []);

  return {
    user,
    loading,
  };
};

export default useAuth;
