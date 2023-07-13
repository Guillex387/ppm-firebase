import { FC, useCallback } from 'react';
import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  MenuGroup,
} from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import auth from '../lib/auth';
import { useAuth } from '../hooks';

const UserMenu: FC = () => {
  const user = useAuth();
  const toast = useToast();

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
    } catch (error) {
      toast({
        title: 'Failed to logout',
        status: 'error',
        isClosable: true,
      });
    }
  }, [toast]);

  return (
    <Menu>
      <MenuButton as={Avatar} size="sm" />
      <MenuList>
        <MenuGroup title={user?.email || undefined}>
          <MenuItem>Manage account</MenuItem>
          <MenuItem color="red.500" onClick={logout}>
            Logout
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
