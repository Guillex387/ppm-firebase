import { FC } from 'react';
import {
  Flex,
  Text,
  Spacer,
  LightMode,
  Progress,
  Box,
  Button,
  Hide,
} from '@chakra-ui/react';

export interface PasswordBlockProps {
  origin: string;
  score: number;
  createdAt: Date;
}

function scoreColor(score: number): string {
  const colors = ['red', 'red', 'orange', 'green'];
  return colors[Math.floor(score / 25)];
}

function formatDate(date: Date, long: boolean = false): string {
  const timeFormat = Intl.DateTimeFormat('en', {
    dateStyle: long ? 'full' : 'short',
  });
  return timeFormat.format(date);
}

const PasswordBlock: FC<PasswordBlockProps> = ({
  origin,
  score,
  createdAt,
}) => {
  return (
    <Flex
      alignItems="center"
      gap={2}
      w="full"
      p={2}
      bgColor="gray.700"
      borderRadius="md"
    >
      <Button colorScheme="blue" variant="ghost">
        {origin}
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
          {formatDate(createdAt)}
        </Text>
      </Hide>
    </Flex>
  );
};

export default PasswordBlock;
