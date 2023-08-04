import type { FC } from 'react';
import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  MenuGroup,
} from '@chakra-ui/react';
import { type User, sendPasswordResetEmail, signOut } from 'firebase/auth';
import auth from '../lib/auth';
import PasswordsDB from '../lib/db';

export interface UserMenuProps {
  user: User;
}

const UserMenu: FC<UserMenuProps> = ({ user }) => {
  const toast = useToast({
    status: 'error',
    isClosable: true,
  });

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      toast({
        title: 'Failed to logout',
      });
    }
  };

  const passwordReset = async () => {
    if (!user || !user.email) return;
    try {
      await sendPasswordResetEmail(auth, user.email);
      toast({
        title: 'Password reset sended',
        status: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error sending the password reset',
      });
    }
  };

  const createMasterKey = async () => {
    const masterKey = prompt('Put the masterkey');
    if (!masterKey || !user) return;
    const db = new PasswordsDB(masterKey, user);
    try {
      const created = await db.createDefaultDocument();
      if (!created) {
        toast({
          title: 'The masterkey already exists',
        });
        return;
      }
    } catch (error) {
      toast({
        title: 'Error making the masterkey',
      });
      return;
    }
    toast({
      title: 'MasterKey created',
      status: 'success',
    });
  };

  return (
    <Menu>
      <MenuButton as={Avatar} size="sm" />
      <MenuList>
        <MenuGroup title={user.email || undefined}>
          <MenuItem onClick={passwordReset}>Password reset</MenuItem>
          <MenuItem onClick={createMasterKey}>Create masterkey</MenuItem>
          <MenuItem color="red.500" onClick={logout}>
            Logout
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
