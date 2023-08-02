import { FC, FormEvent, useRef, useState } from 'react';
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
  useToast,
} from '@chakra-ui/react';
import { Password } from '../lib/db';
import PasswordInput from './PasswordInput';

type PasswordFormData = Iterable<[string, string]>;

interface AddPasswordProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: Password) => void;
  defaultValue?: Password;
  title?: string;
}

const illegalFields = [
  'origin',
  'password',
  'email',
  'createdAt',
  'password security',
];
const mainKeys = ['origin', 'password', 'email'];

const PasswordDialog: FC<AddPasswordProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  defaultValue,
}) => {
  const [extraFields, setExtraFields] = useState<string[]>(
    defaultValue ? Object.keys(defaultValue.others || {}) : []
  );
  const extraFieldInput = useRef<HTMLInputElement | null>(null);
  const toast = useToast();

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const formData = new FormData(
      ev.target as HTMLFormElement
    ) as PasswordFormData;
    const formDataArray = [...formData];
    const { origin, password, email } = Object.fromEntries(
      formDataArray.filter(([key]) => {
        return mainKeys.includes(key);
      })
    );
    const others = Object.fromEntries(
      formDataArray.filter(([key]) => {
        return !mainKeys.includes(key);
      })
    );
    onSubmit({
      origin,
      password,
      email,
      createdAt: defaultValue?.createdAt || Date.now(),
      others,
    });
    onClose();
  };

  const handleExtraField = () => {
    if (!extraFieldInput.current) return;
    const newField = extraFieldInput.current.value;
    extraFieldInput.current.value = '';
    if (!newField) {
      toast({
        title: 'New field is empty',
        status: 'error',
        isClosable: true,
      });
      return;
    }
    if (extraFields.includes(newField) || illegalFields.includes(newField)) {
      toast({
        title: 'This field already exists',
        status: 'error',
        isClosable: true,
      });
      return;
    }
    setExtraFields((array) => {
      return [...array, newField];
    });
  };

  const handleRemoveField = (name: string) => {
    setExtraFields((array) => array.filter((field) => field !== name));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title || 'Add password'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack
            as="form"
            onSubmit={handleSubmit}
            spacing={4}
            mb={4}
            justifyContent="center"
          >
            <Input
              name="origin"
              placeholder="origin"
              defaultValue={defaultValue?.origin}
            />
            <PasswordInput
              name="password"
              placeholder="password"
              defaultValue={defaultValue?.password}
            />
            <Input
              name="email"
              placeholder="email"
              defaultValue={defaultValue?.email}
            />
            {extraFields.map((field) => (
              <Stack key={field} direction="row" spacing={4}>
                <Input
                  name={field}
                  placeholder={field}
                  defaultValue={
                    defaultValue?.others && defaultValue.others[field]
                  }
                />
                <Button onClick={() => handleRemoveField(field)}>Remove</Button>
              </Stack>
            ))}
            <Input ref={extraFieldInput} placeholder="field name" mt={4} />
            <Button onClick={handleExtraField}>Add field</Button>
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
