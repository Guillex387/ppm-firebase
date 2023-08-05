import { type FC, type FormEvent, useState, useLayoutEffect } from 'react';
import {
  Input,
  Button,
  Heading,
  Stack,
  Center,
  useToast,
} from '@chakra-ui/react';
import PasswordInput from '../components/PasswordInput';
import AuthManager from '../lib/auth';

interface LoginProps {
  initialLoading: boolean;
}

const Login: FC<LoginProps> = ({ initialLoading }) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast({
    status: 'error',
    isClosable: true,
  });

  useLayoutEffect(() => {
    setLoading(initialLoading);
  }, [initialLoading]);

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    setLoading(true);
    const formData = new FormData(ev.target as HTMLFormElement);
    const { email, password } = Object.fromEntries(formData);
    if (email instanceof File || password instanceof File) return;
    const manager = new AuthManager();
    try {
      await manager.signIn(email, password);
    } catch (error) {
      toast({
        title: 'Incorrect email or password',
      });
    }
    setLoading(false);
  };

  const forgotPassword = async () => {
    setLoading(true);
    const email = prompt('Put the email for reset your password');
    if (!email) {
      setLoading(false);
      return;
    }
    const manager = new AuthManager();
    try {
      await manager.sendPasswordReset(email);
      toast({
        title: 'Password reset sended',
        status: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error sending the password reset',
      });
    }
    setLoading(false);
  };

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
        <Input
          isDisabled={loading}
          name="email"
          variant="outline"
          placeholder="email"
        />
        <PasswordInput isDisabled={loading} name="password" />
        <Button
          variant="link"
          alignSelf="start"
          size="sm"
          paddingLeft={2}
          color="gray.400"
          isDisabled={loading}
          onClick={forgotPassword}
        >
          Forgot your password?
        </Button>
        <Button
          type="submit"
          colorScheme="blue"
          variant="outline"
          isLoading={loading}
        >
          Submit
        </Button>
      </Stack>
    </Center>
  );
};

export default Login;
