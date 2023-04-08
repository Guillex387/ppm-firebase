import { } from '@mantine/core';
import { useForm } from '@mantine/form';

const emailRegEx: RegExp = /^\S+@\S+$/;

function Login() {
  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    validate: {
      email: value => emailRegEx.test(value) ? null : 'Invalid email',
      password: value => value ? null : 'No password has been set'
    }
  });

  return (
    <>
      { /* TODO: make the login form */ }
    </>
  );
}

export default Login;
