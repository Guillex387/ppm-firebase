import { FC, FormEvent } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';
import { Password } from '../lib/db';

type PasswordFormData = Iterable<[string, string]>;

interface AddPasswordProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: Password) => void;
  // TODO: add a default value
}

const PasswordDialog: FC<AddPasswordProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const formData = new FormData(
      ev.target as HTMLFormElement
    ) as PasswordFormData;
    const formDataArray = [...formData];
    const { origin, password, email } = Object.fromEntries(
      formDataArray.filter(([key]) => {
        const mainKeys = ['origin', 'password', 'email'];
        return mainKeys.includes(key);
      })
    );
    const others = Object.fromEntries(
      formDataArray.filter(([key]) => {
        const mainKeys = ['origin', 'password', 'email'];
        return !mainKeys.includes(key);
      })
    );
    onSubmit({
      origin,
      password,
      email,
      score: 50, // TODO: make the lib for evaluates the passwords
      createdAt: Date.now(),
      others,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack
            as="form"
            onSubmit={handleSubmit}
            spacing={4}
            mb={4}
            justifyContent="center"
          >
            <Input name="origin" placeholder="origin" />
            <Input name="password" placeholder="password" />
            <Input name="email" placeholder="email" />
            {/* Add the additional custom data */}
            <Button colorScheme="green" type="submit">
              Save
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PasswordDialog;
