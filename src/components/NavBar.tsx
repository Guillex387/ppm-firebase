import { type FC, useContext, lazy, Suspense } from 'react';
import { Heading, Box, Flex, Spacer, Center, Image } from '@chakra-ui/react';
import AuthContext from '../contexts/authCtx';

const UserMenu = lazy(() => import('./UserMenu'));

/**
 * Navigation bar component, for show the app title
 * and some stuff
 */
const NavBar: FC = () => {
  const user = useContext(AuthContext);

  return (
    <Box w="100%" bg="gray.700" p={4} h={70}>
      <Flex w="full" h="full" justifyContent="center" alignItems="center">
        <Center>
          <Image boxSize="40px" src="logo.svg" mr={2} />
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
