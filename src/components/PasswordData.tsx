import { type FC, useMemo } from 'react';
import type { PasswordWithId } from '../lib/db';
import { Button, Flex, Text, useBoolean } from '@chakra-ui/react';
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

  return (
    <>
      <Text color="blue.300" fontSize="sm" fontWeight="bold">
        password
      </Text>
      <Flex alignItems="center">
        <Text mr="4">{show ? password.password : '•••••••••••••••••'}</Text>
        <Button size="xs" onClick={toggle}>
          {show ? 'Hide' : 'Show'}
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
