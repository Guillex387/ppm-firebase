import { FC, FormEvent, useCallback } from 'react';
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

interface PasswordData {
  [key: string]: string;
}

interface AddPasswordProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: Password) => void;
}

const AddPassword: FC<AddPasswordProps> = ({ isOpen, onClose, onSubmit }) => {
  const handleSubmit = useCallback(
    (ev: FormEvent) => {
      ev.preventDefault();
      const formData = new FormData(ev.target as HTMLFormElement);
      const obj = Object.fromEntries(formData) as PasswordData;
      onSubmit({
        origin: obj.origin,
        password: obj.password,
        email: obj.email,
        score: 50,
        createdAt: Date.now(),
      });
      onClose();
    },
    [onSubmit]
  );

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
            <Button colorScheme="green" type="submit">
              Save
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddPassword;
