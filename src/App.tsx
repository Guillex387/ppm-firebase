import { FC } from 'react';
import { Center, ChakraBaseProvider } from '@chakra-ui/react';
import theme from './theme';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Passwords from './pages/Passwords';

const App: FC = () => {
  return (
    <ChakraBaseProvider theme={theme}>
      <NavBar />
      <Center>
        {/* <Login /> */}
        <Passwords />
      </Center>
    </ChakraBaseProvider>
  );
};

export default App;
