import { FC, useCallback, useState } from 'react';
import { Box, Input, Button, Heading, Stack } from '@chakra-ui/react';
import PasswordInput from '../components/PasswordInput';

const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = useCallback(() => {
    console.table({ email, password });
    setEmail('');
    setPassword('');
  }, [email, password]);

  return (
    <Box
      as={Stack}
      maxW="md"
      spacing={4}
      p={6}
      borderWidth={1}
      borderRadius="lg"
    >
      <Heading textAlign="center">Login</Heading>
      <Input
        variant="outline"
        placeholder="Enter email"
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
      />
      <PasswordInput
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <Button colorScheme="blue" variant="outline" onClick={submit}>
        Submit
      </Button>
    </Box>
  );
};

export default Login;
