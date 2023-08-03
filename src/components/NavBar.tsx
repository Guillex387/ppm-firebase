import { type FC, useContext } from 'react';
import UserMenu from './UserMenu';
import { Heading, Box, Flex, Spacer, Center } from '@chakra-ui/react';
import { AuthContext } from '../lib/auth';

const NavBar: FC = () => {
  const user = useContext(AuthContext);

  return (
    <Box w="100%" bg="gray.700" p={4} h={70}>
      <Flex w="full" h="full" justifyContent="center" alignItems="center">
        <Center>
          <Heading as="h1" size="md">
            PPM Password Manager
          </Heading>
        </Center>
        <Spacer />
        {user && <UserMenu />}
      </Flex>
    </Box>
  );
};

export default NavBar;
