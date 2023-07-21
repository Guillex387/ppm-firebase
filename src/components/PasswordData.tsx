import { FC, useMemo } from 'react';
import { PasswordWithId } from '../lib/db';
import { Button, Flex, Text, useBoolean } from '@chakra-ui/react';
import { formatDate } from '../utils';

export interface PasswordDataProps {
  password: PasswordWithId;
}

const PasswordData: FC<PasswordDataProps> = ({ password }) => {
  const [show, { toggle }] = useBoolean(false);
  const parsed = useMemo(() => {
    let obj: Object = {
      email: password.email,
      'created at': formatDate(password.createdAt, true),
    };
    if (password.others) obj = { ...password.others, ...obj };
    return obj;
  }, []);

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
