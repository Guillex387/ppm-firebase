import { FC, useState } from 'react';
import { ChakraBaseProvider, Flex, Box } from '@chakra-ui/react';
import theme from './theme';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Passwords from './pages/Passwords';
import AuthContext from './lib/auth';

const App: FC = () => {
  const [auth, setAuth] = useState(false);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <ChakraBaseProvider theme={theme}>
        <Flex direction="column" w="full" h="full">
          <NavBar />
          <Box position="relative" w="full" h="full">
            {auth ? <Passwords /> : <Login />}
          </Box>
        </Flex>
      </ChakraBaseProvider>
    </AuthContext.Provider>
  );
};

export default App;
