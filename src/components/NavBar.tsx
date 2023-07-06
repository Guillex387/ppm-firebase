import { FC } from 'react';
import UserMenu from './UserMenu';
import { Heading, Box, Flex, Spacer, Center } from '@chakra-ui/react';

const NavBar: FC = () => {
  return (
    <Box w="100%" bg="gray.700" p={4}>
      <Flex>
        <Center>
          <Heading as="h1" size="md">
            PPM Password Manager
          </Heading>
        </Center>
        <Spacer />
        <UserMenu />
      </Flex>
    </Box>
  );
};

export default NavBar;
