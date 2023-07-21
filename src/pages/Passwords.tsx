import {
  Button,
  Divider,
  Flex,
  LightMode,
  Spacer,
  VStack,
  Text,
  Center,
} from '@chakra-ui/react';
import { FC, useMemo, useState } from 'react';
import PasswordBlock from '../components/PasswordBlock';
import { PasswordWithId } from '../lib/db';

function fetchPasswords() {
  const example: PasswordWithId[] = [
    {
      id: '3',
      origin: 'google.com',
      email: 'hola@example.com',
      password: 'hola1234',
      createdAt: new Date().toDateString(),
      score: 12,
    },
    {
      id: '2',
      origin: 'instagram.com',
      email: 'subnormal@example.com',
      password: 'tres_coyols',
      createdAt: new Date().toDateString(),
      score: 58,
    },
    {
      id: '1',
      origin: 'bbva.com',
      email: 'secure@example.com',
      password: '@#7669sadGHT',
      createdAt: new Date().toDateString(),
      score: 100,
      others: {
        'account number': '2080 5801 10 1234567891',
      },
    },
  ];
  return example;
}

const Passwords: FC = () => {
  const passwords = useMemo(fetchPasswords, []);
  const [unLocked, setLock] = useState(true);

  return (
    <Center>
      <VStack w="60vw" minW="20rem" marginTop={10}>
        <Flex w="full" gap={2} alignItems="center">
          <Button
            colorScheme="blue"
            variant="outline"
            onClick={() => setLock(!unLocked)}
          >
            {unLocked ? 'Lock' : 'Unlock'}
          </Button>
          <Spacer />
          <LightMode>
            <Button isDisabled={!unLocked} colorScheme="blue">
              Add
            </Button>
            <Button isDisabled={!unLocked} colorScheme="green">
              Reload
            </Button>
          </LightMode>
        </Flex>
        <Divider margin={1} />
        {unLocked ? (
          passwords.map((password) => (
            <PasswordBlock key={password.id} password={password} />
          ))
        ) : (
          <Text
            w="full"
            textAlign="center"
            p={4}
            bgColor="gray.700"
            borderRadius="md"
            color="gray.400"
          >
            Unlock the content for view your data
          </Text>
        )}
      </VStack>
    </Center>
  );
};

export default Passwords;
