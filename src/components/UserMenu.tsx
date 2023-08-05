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
import type { User } from 'firebase/auth';
import AuthManager from '../lib/auth';

export interface UserMenuProps {
  user: User;
}

/**
 * A component for manage your app account
 * @param user The object that represent the login user
 */
const UserMenu: FC<UserMenuProps> = ({ user }) => {
  const toast = useToast({
    status: 'error',
    isClosable: true,
  });

  const logout = async () => {
    const manager = new AuthManager();
    try {
      await manager.signOut();
    } catch (error) {
      toast({
        title: 'Failed to logout',
      });
    }
  };

  const passwordReset = async () => {
    if (!user || !user.email) return;
    const manager = new AuthManager();
    try {
      await manager.sendPasswordReset(user.email);
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
    const PasswordsDB = await import('../lib/db');
    const db = new PasswordsDB.default(masterKey, user);
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
