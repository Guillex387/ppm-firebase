import { FC, useCallback } from 'react';
import { Avatar, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

const UserMenu: FC = () => {
  const onclick = useCallback(() => {
    console.log('You pressed a part of menu');
  }, []);

  return (
    <Menu>
      <MenuButton as={Avatar} size="sm" />
      <MenuList>
        <MenuItem onClick={onclick}>Manage account</MenuItem>
        <MenuItem onClick={onclick} color="red.500">
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
