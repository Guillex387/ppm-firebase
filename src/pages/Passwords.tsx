import {
  Button,
  Divider,
  Flex,
  LightMode,
  Spacer,
  VStack,
  Text,
} from '@chakra-ui/react';
import { FC, useMemo, useState } from 'react';
import PasswordBlock from '../components/PasswordBlock';

interface Password {
  id: number;
  origin: string;
  email: string;
  password: string;
  score: number;
  createdAt: Date;
  others?: Object;
}

function fetchPasswords() {
  const example: Password[] = [
    {
      id: 3,
      origin: 'google.com',
      email: 'hola@example.com',
      password: 'hola1234',
      createdAt: new Date(),
      score: 12,
    },
    {
      id: 2,
      origin: 'instagram.com',
      email: 'subnormal@example.com',
      password: 'tres_coyols',
      createdAt: new Date(),
      score: 58,
    },
    {
      id: 1,
      origin: 'bbva.com',
      email: 'secure@example.com',
      password: '@#7669sadGHT',
      createdAt: new Date(),
      score: 98,
    },
  ];
  return example;
}

const Passwords: FC = () => {
  const passwords = useMemo(fetchPasswords, []);
  const [unLocked, setLock] = useState(true);

  return (
    <VStack w="40vw" minW="20em" marginTop="2em">
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
          {/* I use loading property for disable the button */}
          <Button
            isLoading={!unLocked}
            spinner={<Text>Add Password</Text>}
            colorScheme="blue"
          >
            Add Password
          </Button>
        </LightMode>
      </Flex>
      <Divider margin={1} />
      {unLocked ? (
        passwords.map(({ id, origin, score, createdAt }) => (
          <PasswordBlock
            id={id.toString()}
            origin={origin}
            score={score}
            createdAt={createdAt}
          />
        ))
      ) : (
        <Text
          w="full"
          textAlign="center"
          p={4}
          bgColor="gray.700"
          borderRadius="md"
        >
          Unlock the content for view your data
        </Text>
      )}
    </VStack>
  );
};

export default Passwords;
