import { FC, FormEvent, useCallback, useContext } from 'react';
import { Input, Button, Heading, Stack, Center } from '@chakra-ui/react';
import PasswordInput from '../components/PasswordInput';
import AuthContext from '../lib/auth';

const Login: FC = () => {
  const { setAuth } = useContext(AuthContext);

  const submit = useCallback(
    (ev: FormEvent) => {
      ev.preventDefault();
      const formData = new FormData(ev.target as HTMLFormElement);
      const data = Object.fromEntries(formData);
      console.log(data);
      setAuth(true);
    },
    [setAuth]
  );

  return (
    <Center marginTop={20}>
      <Stack
        as="form"
        maxW="md"
        spacing={4}
        p={6}
        borderWidth={1}
        borderRadius="lg"
        onSubmit={submit}
      >
        <Heading textAlign="center">Login</Heading>
        <Input name="email" variant="outline" placeholder="Enter email" />
        <PasswordInput name="password" />
        <Button type="submit" colorScheme="blue" variant="outline">
          Submit
        </Button>
      </Stack>
    </Center>
  );
};

export default Login;
