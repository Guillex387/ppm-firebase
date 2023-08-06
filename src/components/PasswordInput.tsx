import { forwardRef, type FC, type Ref } from 'react';
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useBoolean,
  InputProps,
} from '@chakra-ui/react';

export interface PasswordInputProps extends InputProps {
  ref?: Ref<HTMLInputElement>;
}

/**
 * A classic password text input
 */
const PasswordInput: FC<PasswordInputProps> = forwardRef((props, ref) => {
  const [show, { toggle }] = useBoolean(false);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? 'text' : 'password'}
        placeholder="password"
        ref={ref}
        {...props}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={toggle}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
});

export default PasswordInput;
