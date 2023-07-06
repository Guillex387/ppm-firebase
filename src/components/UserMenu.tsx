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
        <MenuItem onClick={onclick}>TODO</MenuItem>
        <MenuItem onClick={onclick}>TODO</MenuItem>
        <MenuItem onClick={onclick}>TODO</MenuItem>
        <MenuItem onClick={onclick}>TODO</MenuItem>
        <MenuItem onClick={onclick}>TODO</MenuItem>
        <MenuItem onClick={onclick}>TODO</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
