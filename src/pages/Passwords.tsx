import {
  Button,
  Divider,
  Flex,
  LightMode,
  Spacer,
  VStack,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { FC, useCallback } from 'react';
import PasswordBlock from '../components/PasswordBlock';
import { PasswordWithId } from '../lib/db';
import { usePasswords } from '../hooks';
import { User } from 'firebase/auth';

function fetchPasswords() {
  const example: PasswordWithId[] = [
    {
      id: '3',
      origin: 'google.com',
      email: 'hola@example.com',
      password: 'hola1234',
      createdAt: Date.now(),
      score: 12,
    },
    {
      id: '2',
      origin: 'instagram.com',
      email: 'subnormal@example.com',
      password: 'tres_coyols',
      createdAt: Date.now(),
      score: 58,
    },
    {
      id: '1',
      origin: 'bbva.com',
      email: 'secure@example.com',
      password: '@#7669sadGHT',
      createdAt: Date.now(),
      score: 100,
      others: {
        'account number': '2080 5801 10 1234567891',
      },
    },
  ];
  return example;
}

export interface PasswordsProps {
  user: User;
}

const Passwords: FC<PasswordsProps> = ({ user }) => {
  const { passwords, locked, loading, reload, unlock, lock } =
    usePasswords(user);

  const unlockClick = useCallback(async () => {
    if (locked) {
      const masterKey = prompt('Master key');
      if (!masterKey) return;
      await unlock(masterKey);
      return;
    }
    lock();
  }, [locked, unlock, lock]);

  return (
    <Center>
      <VStack w="60vw" minW="20rem" mt={10} pb={10}>
        <Flex w="full" gap={2} alignItems="center">
          <Button
            colorScheme="blue"
            variant="outline"
            isDisabled={loading}
            onClick={unlockClick}
          >
            {locked ? 'Unlock' : 'Lock'}
          </Button>
          <Spacer />
          <LightMode>
            <Button isDisabled={locked || loading} colorScheme="blue">
              Add
            </Button>
            <Button
              isDisabled={locked || loading}
              colorScheme="green"
              onClick={reload}
            >
              Reload
            </Button>
          </LightMode>
        </Flex>
        <Divider margin={1} />
        {loading || !passwords ? (
          <Flex
            w="full"
            alignItems="center"
            justifyContent="center"
            p={4}
            bgColor="gray.700"
            borderRadius="md"
            color="gray.400"
          >
            {loading ? (
              <Spinner />
            ) : (
              <p>Unlock the content for view your data</p>
            )}
          </Flex>
        ) : (
          passwords.map((password) => (
            <PasswordBlock key={password.id} password={password} />
          ))
        )}
      </VStack>
    </Center>
  );
};

export default Passwords;
