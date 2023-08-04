import {
  Button,
  Divider,
  Flex,
  LightMode,
  Spacer,
  VStack,
  Spinner,
  Center,
  useDisclosure,
} from '@chakra-ui/react';
import type { FC } from 'react';
import PasswordBlock from '../components/PasswordBlock';
import usePasswords from '../hooks/usePasswords';
import type { User } from 'firebase/auth';
import PasswordDialog from '../components/PasswordDialog';
import Container from '../components/Container';

export interface PasswordsProps {
  user: User;
}

const Passwords: FC<PasswordsProps> = ({ user }) => {
  const {
    passwords,
    locked,
    loading,
    reload,
    unlock,
    lock,
    add,
    remove,
    edit,
  } = usePasswords(user);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUnlock = async () => {
    if (locked) {
      const masterKey = prompt('Master key');
      if (!masterKey) return;
      await unlock(masterKey);
      return;
    }
    lock();
  };

  return (
    <>
      <Center>
        <VStack w="60vw" minW="20rem" mt={10} pb={10}>
          <Flex w="full" gap={2} alignItems="center">
            <Button
              colorScheme="blue"
              variant="outline"
              isDisabled={loading}
              onClick={handleUnlock}
            >
              {locked ? 'Unlock' : 'Lock'}
            </Button>
            <Spacer />
            <LightMode>
              <Button
                isDisabled={locked || loading}
                colorScheme="blue"
                onClick={onOpen}
              >
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
          {locked || !passwords ? (
            <Container>
              <p>Unlock the content for view your data</p>
            </Container>
          ) : (
            passwords.map((password) => (
              <PasswordBlock
                key={password.id}
                password={password}
                remove={remove}
                edit={edit}
              />
            ))
          )}
          {loading && (
            <Container>
              <Spinner />
            </Container>
          )}
        </VStack>
      </Center>
      <PasswordDialog isOpen={isOpen} onClose={onClose} onSubmit={add} />
    </>
  );
};

export default Passwords;
