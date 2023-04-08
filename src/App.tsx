import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'dark' }}>
      { /* TODO: validate with a context if the user is auth or not */ }
    </MantineProvider>
  );
}

export default App;
