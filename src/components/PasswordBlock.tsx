import { FC, useMemo, useState } from 'react';
import {
  Flex,
  Text,
  Spacer,
  LightMode,
  Progress,
  Box,
  Button,
  Hide,
  Collapse,
  useDisclosure,
  Divider,
} from '@chakra-ui/react';
import { Password, PasswordWithId } from '../lib/db';
import PasswordData from './PasswordData';
import { formatDate, passwordScore } from '../utils';
import PasswordDialog from './PasswordDialog';

export interface PasswordBlockProps {
  password: PasswordWithId;
  remove: (id: string) => any;
  edit: (id: string, password: Password) => any;
}

function scoreColor(score: number): string {
  const colors = ['red', 'red', 'orange', 'green', 'green'];
  return colors[Math.floor(score / 25)];
}

const PasswordBlock: FC<PasswordBlockProps> = ({ password, remove, edit }) => {
  const { isOpen, onToggle } = useDisclosure();
  const dialog = useDisclosure();
  const score = useMemo(() => {
    return passwordScore(password.password);
  }, [password.password]);

  const handleRemove = () => {
    const confirmation = confirm('Are you sure?, this data is not retrivable');
    if (!confirmation) return;
    remove(password.id);
  };

  const handleEdit = (newPassword: Password) => {
    edit(password.id, newPassword);
  };

  return (
    <>
      <Box w="full" p={2} bgColor="gray.700" borderRadius="md">
        <Flex alignItems="center" gap={2}>
          <Button colorScheme="blue" variant="ghost" onClick={onToggle}>
            {password.origin}
          </Button>
          <Spacer />
          <Box w="40%" maxW="12em" marginRight="1em">
            <LightMode>
              <Progress
                size="xs"
                value={score}
                colorScheme={scoreColor(score)}
                borderRadius="md"
                bgColor="gray.800"
              />
            </LightMode>
          </Box>
          <Hide below="md">
            <Text as="b" marginRight="1em">
              {formatDate(password.createdAt)}
            </Text>
          </Hide>
        </Flex>
        <Collapse in={isOpen} animateOpacity>
          <Divider mt={2} mb={2} />
          <Box pl={3} pr={3}>
            <PasswordData password={password} />
          </Box>
          <Flex mt={4} justifyContent="space-between" alignItems="center">
            <Button
              colorScheme="blue"
              variant="outline"
              onClick={dialog.onOpen}
            >
              Edit
            </Button>
            <Button colorScheme="red" variant="outline" onClick={handleRemove}>
              Delete
            </Button>
          </Flex>
        </Collapse>
      </Box>
      <PasswordDialog
        title="Edit password"
        defaultValue={password}
        isOpen={dialog.isOpen}
        onClose={dialog.onClose}
        onSubmit={handleEdit}
      />
    </>
  );
};

export default PasswordBlock;
