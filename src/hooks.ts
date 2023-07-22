import { useCallback, useEffect, useMemo, useState } from 'react';
import auth from './lib/auth';
import { User, onAuthStateChanged } from 'firebase/auth';
import PasswordsDB, { Password, PasswordWithId } from './lib/db';
import { useToast } from '@chakra-ui/react';

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

export const usePasswords = (user: User) => {
  const [db, setDB] = useState<PasswordsDB | null>(null);
  const [passwords, setPasswords] = useState<PasswordWithId[] | null>(null);
  const [loading, setLoading] = useState(false);
  const locked = useMemo(() => !db, [db]);
  const toast = useToast();

  const reload = useCallback(async () => {
    if (!db) return;
    setLoading(true);
    try {
      const passwords = await db.getPasswords();
      setPasswords(passwords);
    } catch (error) {
      toast({
        title: 'Error getting passwords',
        status: 'error',
        isClosable: true,
      });
    }
    setLoading(false);
  }, [db]);

  const unlock = useCallback(
    async (masterKey: string) => {
      if (db) return;
      setLoading(true);
      try {
        const db = new PasswordsDB(masterKey, user);
        const correctMasterKey = await db.verifyMasterKey();
        if (!correctMasterKey) {
          toast({
            title: 'Bad master key',
            status: 'error',
            isClosable: true,
          });
        } else {
          setDB(db);
          const passwords = await db.getPasswords();
          setPasswords(passwords);
        }
      } catch (error) {
        toast({
          title: 'Error verifying master key',
          status: 'error',
          isClosable: true,
        });
      }
      setLoading(false);
    },
    [db]
  );

  const lock = useCallback(() => {
    setDB(null);
  }, []);

  const add = useCallback(
    async (password: Password) => {
      if (!db) return;
      setLoading(true);
      try {
        await db.addPassword(password);
        const passwords = await db.getPasswords();
        setPasswords(passwords);
      } catch (error) {
        toast({
          title: 'Error adding the password',
          status: 'error',
          isClosable: true,
        });
      }
      setLoading(false);
    },
    [db]
  );

  const remove = useCallback(
    async (id: string) => {
      if (!db) return;
      try {
        await db.deletePassword(id);
        const passwords = await db.getPasswords();
        setPasswords(passwords);
      } catch (error) {
        toast({
          title: 'Error removing the password',
          status: 'error',
          isClosable: true,
        });
      }
    },
    [db]
  );

  return {
    passwords,
    locked,
    loading,
    reload,
    lock,
    unlock,
    add,
    remove,
  };
};
