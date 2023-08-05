import { type FC, useMemo } from 'react';
import type { PasswordWithId } from '../lib/db';
import {
  Button,
  Flex,
  Input,
  Text,
  useBoolean,
  useClipboard,
} from '@chakra-ui/react';
import { formatDate, passwordScore } from '../utils';

export interface PasswordDataProps {
  password: PasswordWithId;
}

/**
 * A component to show the explicit info of the password
 * @param password The object that contains the password info
 */
const PasswordData: FC<PasswordDataProps> = ({ password }) => {
  const [show, { toggle }] = useBoolean(false);
  const parsed = useMemo(() => {
    let obj: Object = {
      email: password.email,
      'created at': formatDate(password.createdAt, true),
    };
    if (password.others) obj = { ...password.others, ...obj };
    return obj;
  }, [password]);
  const score = useMemo(() => {
    return passwordScore(password.password);
  }, [password.password]);
  const { onCopy, hasCopied } = useClipboard(password.password);

  return (
    <>
      <Text color="blue.300" fontSize="sm" fontWeight="bold">
        password
      </Text>
      <Flex alignItems="center">
        <Input
          mr="4"
          type={show ? 'text' : 'password'}
          variant="unstyled"
          maxW={60}
          value={password.password}
        />
        <Button size="xs" onClick={toggle} mr="4">
          {show ? 'Hide' : 'Show'}
        </Button>
        <Button size="xs" onClick={onCopy}>
          {hasCopied ? 'Copied!' : 'Copy'}
        </Button>
      </Flex>
      <Text color="blue.300" fontSize="sm" fontWeight="bold">
        password security
      </Text>
      <Text>{score}/100</Text>
      {Object.entries(parsed).map(([attribute, value]) => (
        <div key={attribute}>
          <Text color="blue.300" fontSize="sm" fontWeight="bold">
            {attribute}
          </Text>
          <Text>{value}</Text>
        </div>
      ))}
    </>
  );
};

export default PasswordData;
