import { FC } from 'react';
import { ChakraBaseProvider } from '@chakra-ui/react';
import theme from './theme';
import NavBar from './components/NavBar';

const App: FC = () => {
  return (
    <ChakraBaseProvider theme={theme}>
      <NavBar />
    </ChakraBaseProvider>
  );
};

export default App;
