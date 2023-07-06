import { AppShell, Header, Navbar } from '@mantine/core';
import NavBar from '../components/NavBar';

function MainApp() {
  return (
    <AppShell
        padding="md"
        navbar={<Navbar width={{ base: 200 }} p="xs">{/* Navbar content */}</Navbar>}
        header={<Header height={60} p="xs">
          <NavBar />
        </Header>}
        styles={(theme) => ({
          main: { backgroundColor: theme.colors.dark[8] }
        })}>
        { /* TODO: Make the app UI */ }
    </AppShell>
  );
}

export default MainApp;
