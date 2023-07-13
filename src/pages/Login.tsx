import { FC, FormEvent, useCallback, useContext, useState } from 'react';
import {
  Input,
  Button,
  Heading,
  Stack,
  Center,
  useToast,
} from '@chakra-ui/react';
import PasswordInput from '../components/PasswordInput';
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import auth from '../lib/auth';

const Login: FC = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const submit = useCallback(
    async (ev: FormEvent) => {
      ev.preventDefault();
      setLoading(true);
      const formData = new FormData(ev.target as HTMLFormElement);
      const { email, password } = Object.fromEntries(formData);
      if (email instanceof File || password instanceof File) return;
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        toast({
          title: 'Incorrect email or password',
          status: 'error',
          isClosable: true,
        });
      }
      setLoading(false);
    },
    [toast]
  );

  const forgotPassword = useCallback(async () => {
    setLoading(true);
    const email = prompt('Put the email for reset your password');
    if (!email) {
      setLoading(false);
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast({
        title: 'Password reset sended',
        status: 'success',
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error sending the password reset',
        status: 'error',
        isClosable: true,
      });
    }
    setLoading(false);
  }, [toast]);

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
