import { type User } from 'firebase/auth';
import { useState, useEffect } from 'react';
import FirebaseVars from '../lib/firebase';

/**
 * A hook for manage the auth state
 */
const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    listener();
  }, []);

  const listener = async () => {
    const { onAuthStateChanged } = await import('firebase/auth');
    const vars = new FirebaseVars();
    onAuthStateChanged(await vars.getAuth(), (user) => {
      setUser(user);
      loading && setLoading(false);
    });
  };

  return {
    user,
    loading,
  };
};

export default useAuth;
