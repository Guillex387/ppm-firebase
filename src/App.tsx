import type { FC } from 'react';
import { ChakraBaseProvider, Flex, Box } from '@chakra-ui/react';
import theme from './theme';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Passwords from './pages/Passwords';
import { AuthContext } from './lib/auth';
import { useAuth } from './hooks';

const App: FC = () => {
  const user = useAuth();

  return (
    <AuthContext.Provider value={user}>
      <ChakraBaseProvider theme={theme}>
        <Flex direction="column" w="full" h="full">
          <NavBar />
          <Box position="relative" w="full" h="full">
            {user ? <Passwords user={user} /> : <Login />}
          </Box>
        </Flex>
      </ChakraBaseProvider>
    </AuthContext.Provider>
  );
};

export default App;
