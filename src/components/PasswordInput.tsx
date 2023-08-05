import type { FC } from 'react';
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useBoolean,
  InputProps,
} from '@chakra-ui/react';

/**
 * A classic password text input
 */
const PasswordInput: FC<InputProps> = (props) => {
  const [show, { toggle }] = useBoolean(false);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? 'text' : 'password'}
        placeholder="password"
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
