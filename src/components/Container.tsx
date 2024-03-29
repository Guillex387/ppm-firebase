import type { PropsWithChildren } from 'react';
import { Flex } from '@chakra-ui/react';

/**
 * Visual block component, to wrap text or other component
 */
const Container = ({ children }: PropsWithChildren) => {
  return (
    <Flex
      w="full"
      alignItems="center"
      justifyContent="center"
      p={4}
      bgColor="gray.700"
      borderRadius="md"
      color="gray.400"
    >
      {children}
    </Flex>
  );
};

export default Container;
