import type { User } from 'firebase/auth';
import PasswordsDB from '../lib/db';
import { useRef, useState, useMemo } from 'react';
import { useToast } from '@chakra-ui/react';
import type { Password, PasswordWithId } from '../lib/db';

const usePasswords = (user: User) => {
  const db = useRef<PasswordsDB | null>(null);
  const [passwords, setPasswords] = useState<PasswordWithId[] | null>(null);
  const [loading, setLoading] = useState(false);
  const locked = useMemo(() => !passwords, [passwords]);
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
    const newDB = new PasswordsDB(masterKey, user);
    try {
      const correctMasterKey = await newDB.verifyMasterKey();
      if (!correctMasterKey) {
        if (await newDB.isNewAccount()) {
          toast({
            title: 'Create a masterKey',
            description: 'Note: is in the user icon',
            status: 'warning',
            isClosable: true,
          });
        } else {
          toast({
            title: 'Bad master key',
            status: 'error',
            isClosable: true,
          });
        }
        setLoading(false);
        return;
      }
    } catch (error) {
      toast({
        title: 'Error verifying master key',
        status: 'error',
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    db.current = newDB;
    const passwords = await newDB.getPasswords();
    setPasswords(passwords);
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

  const edit = async (id: string, password: Password) => {
    if (!db.current) return;
    setLoading(true);
    try {
      await db.current.updatePassword(id, password);
      const passwords = await db.current.getPasswords();
      setPasswords(passwords);
    } catch (error) {
      toast({
        title: 'Error updating the password',
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
    edit,
    remove,
  };
};

export default usePasswords;
