import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import { type FC, type ReactNode, useRef } from 'react';
import PasswordInput from './PasswordInput';

export interface ComponentWithPromptProps {
  children: ReactNode;
  onClick: (res: string) => any;
  title?: string;
  type?: 'text' | 'password';
}

/**
 * A wrapper that display a prompt dialog
 * and then do an action with it
 * @param children The child node
 * @param onClick The action to perform
 * @param title The title of the modal (Optional)
 * @param type The type of input in the modal (Default 'text')
 */
const ComponentWithPrompt: FC<ComponentWithPromptProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClose = () => {
    if (!inputRef.current) return;
    inputRef.current.value = '';
    onClose();
  };

  const handleClick = () => {
    if (!inputRef.current) return;
    const res = inputRef.current.value;
    inputRef.current.value = '';
    onClose();
    props.onClick(res);
  };

  return (
    <>
      <div onClick={onOpen}>{props.children}</div>
      <AlertDialog
        leastDestructiveRef={inputRef}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {props.title || 'Prompt'}
            </AlertDialogHeader>
            <AlertDialogBody>
              {props.type === 'password' ? (
                <PasswordInput ref={inputRef} placeholder="" />
              ) : (
                <Input ref={inputRef} />
              )}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={handleClose}>Cancel</Button>
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

export default ComponentWithPrompt;
