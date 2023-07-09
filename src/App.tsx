import { FC } from 'react';
import { AbsoluteCenter, Center, ChakraBaseProvider } from '@chakra-ui/react';
import theme from './theme';
import NavBar from './components/NavBar';
import Login from './pages/Login';

const App: FC = () => {
  return (
    <ChakraBaseProvider theme={theme}>
      <NavBar />
      <AbsoluteCenter>
        <Login />
      </AbsoluteCenter>
    </ChakraBaseProvider>
  );
};

export default App;
