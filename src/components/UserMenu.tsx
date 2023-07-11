import { FC, useContext } from 'react';
import { Avatar, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import AuthContext from '../lib/auth';

const UserMenu: FC = () => {
  const { setAuth } = useContext(AuthContext);

  return (
    <Menu>
      <MenuButton as={Avatar} size="sm" />
      <MenuList>
        <MenuItem>Manage account</MenuItem>
        <MenuItem onClick={() => setAuth(false)} color="red.500">
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
