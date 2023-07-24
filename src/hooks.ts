import { useEffect, useMemo, useRef, useState } from 'react';
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
  const db = useRef<PasswordsDB | null>(null);
  const [passwords, setPasswords] = useState<PasswordWithId[] | null>(null);
  const [loading, setLoading] = useState(false);
  const locked = useMemo(() => !db, [db]);
  const toast = useToast();

  const reload = async () => {
    if (!db.current) return;
    setLoading(true);
    try {
      const passwords = await db.current.getPasswords();
      setPasswords(passwords);
    } catch (error) {
      toast({
        title: 'Error getting passwords',
        status: 'error',
        isClosable: true,
      });
    }
    setLoading(false);
  };

  const unlock = async (masterKey: string) => {
    if (db.current) return;
    setLoading(true);
    try {
      const newDB = new PasswordsDB(masterKey, user);
      const correctMasterKey = await newDB.verifyMasterKey();
      if (!correctMasterKey) {
        toast({
          title: 'Bad master key',
          status: 'error',
          isClosable: true,
        });
      } else {
        db.current = newDB;
        const passwords = await newDB.getPasswords();
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
  };

  const lock = () => {
    db.current = null;
    setPasswords(null);
  };

  const add = async (password: Password) => {
    if (!db.current) return;
    setLoading(true);
    try {
      await db.current.addPassword(password);
      const passwords = await db.current.getPasswords();
      setPasswords(passwords);
    } catch (error) {
      toast({
        title: 'Error adding the password',
        status: 'error',
        isClosable: true,
      });
    }
    setLoading(false);
  };

  const remove = async (id: string) => {
    if (!db.current) return;
    setLoading(true);
    try {
      await db.current.deletePassword(id);
      const passwords = await db.current.getPasswords();
      setPasswords(passwords);
    } catch (error) {
      toast({
        title: 'Error removing the password',
        status: 'error',
        isClosable: true,
      });
    }
    setLoading(false);
  };

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
