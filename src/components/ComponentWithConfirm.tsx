import { type FC, type ReactNode, useRef } from 'react';
import {
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
} from '@chakra-ui/react';

export interface ComponentWithConfirmProps {
  children: ReactNode;
  action: () => any;
  title?: string;
  body?: string;
  disabled?: boolean;
}

/**
 * A wrapper that display a confirmation
 * to do an action of a component
 * @param children The react child
 * @param action The action to perform
 * @param title The title of the modal (Optional)
 * @param description The description of the modal (Optional)
 * @param disabled A state for disable the modal (Optional)
 */
const ComponentWithConfirm: FC<ComponentWithConfirmProps> = (props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const handleOpen = () => {
    if (props.disabled) return;
    onOpen();
  };

  const handleClick = () => {
    onClose();
    props.action();
  };

  return (
    <>
      <div onClick={handleOpen}>{props.children}</div>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {props.title || 'Confirmation'}
            </AlertDialogHeader>
            <AlertDialogBody>
              {props.body ||
                "Are you sure? You can't undo this action afterwards."}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handleClick} ml={3}>
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ComponentWithConfirm;
