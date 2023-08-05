import { type FC, lazy, Suspense } from 'react';
import {
  ChakraBaseProvider,
  Flex,
  Box,
  Center,
  Spinner,
} from '@chakra-ui/react';
import Login from './pages/Login';
import theme from './theme';
import NavBar from './components/NavBar';
import AuthContext from './contexts/authCtx';
import useAuth from './hooks/useAuth';

const Passwords = lazy(() => import('./pages/Passwords'));

const App: FC = () => {
  const { user, loading } = useAuth();

  return (
    <AuthContext.Provider value={user}>
      <ChakraBaseProvider theme={theme}>
        <Flex direction="column" w="full" h="full">
          <NavBar />
          <Box position="relative" w="full" h="full">
            {user ? (
              <Suspense
                fallback={
                  <Center h="full">
                    <Spinner size="xl" />
                  </Center>
                }
              >
                <Passwords user={user} />
              </Suspense>
            ) : (
              <Login initialLoading={loading} />
            )}
          </Box>
        </Flex>
      </ChakraBaseProvider>
    </AuthContext.Provider>
  );
};

export default App;
