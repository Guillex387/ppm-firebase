import { FC } from 'react';
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useBoolean,
  InputProps,
} from '@chakra-ui/react';

const PasswordInput: FC<InputProps> = (props) => {
  const [show, { toggle }] = useBoolean(false);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? 'text' : 'password'}
        placeholder="Enter password"
        {...props}
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
