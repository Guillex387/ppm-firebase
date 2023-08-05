import { type FC, useContext, lazy, Suspense } from 'react';
import { Heading, Box, Flex, Spacer, Center } from '@chakra-ui/react';
import { AuthContext } from '../contexts';

const UserMenu = lazy(() => import('./UserMenu'));

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
        {user && (
          <Suspense>
            <UserMenu user={user} />
          </Suspense>
        )}
      </Flex>
    </Box>
  );
};

export default NavBar;
