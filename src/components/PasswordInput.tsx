import { FC, ChangeEventHandler } from 'react';
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useBoolean,
} from '@chakra-ui/react';

export interface PasswordInputProps {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const PasswordInput: FC<PasswordInputProps> = ({ value, onChange }) => {
  const [show, { toggle }] = useBoolean(false);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder="Enter password"
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={toggle}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default PasswordInput;
