import {
  type FC,
  type FormEvent,
  useRef,
  useState,
  useMemo,
  useEffect,
} from 'react';
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
import type { Password } from '../lib/db';
import PasswordInput from './PasswordInput';

type PasswordFormData = Iterable<[string, string]>;

export interface AddPasswordProps {
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

/**
 * A modal form to create and edit a password
 * @param isOpen boolean state that shows or not the modal
 * @param onClose function to close the modal
 * @param onSubmit function to capture the data of the form submit
 * @param title the title of the modal
 * @param defaultValue the default values of the form when open the modal
 */
const PasswordDialog: FC<AddPasswordProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  defaultValue,
}) => {
  const initialFields = useMemo(() => {
    return defaultValue ? Object.keys(defaultValue.others || {}) : [];
  }, [defaultValue]);
  const [defaultValueRender, setDefaultValueRender] = useState(defaultValue);
  const [extraFields, setExtraFields] = useState<string[]>(initialFields);
  const extraFieldInput = useRef<HTMLInputElement | null>(null);
  const toast = useToast({
    status: 'error',
    isClosable: true,
  });

  useEffect(() => {
    if (!isOpen) {
      setDefaultValueRender(undefined);
    } else {
      setExtraFields(initialFields);
      setDefaultValueRender(defaultValue);
    }
  }, [isOpen]);

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
      });
      return;
    }
    if (extraFields.includes(newField) || illegalFields.includes(newField)) {
      toast({
        title: 'This field already exists',
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      size={['full', 'full', 'md']}
    >
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
              defaultValue={defaultValueRender?.origin}
            />
            <PasswordInput
              name="password"
              placeholder="password"
              defaultValue={defaultValueRender?.password}
            />
            <Input
              name="email"
              placeholder="email"
              defaultValue={defaultValueRender?.email}
            />
            {extraFields.map((field) => (
              <Stack key={field} direction="row" spacing={4}>
                <Input
                  name={field}
                  placeholder={field}
                  defaultValue={
                    defaultValueRender?.others &&
                    defaultValueRender.others[field]
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
