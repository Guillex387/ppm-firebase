import type { FC } from 'react';
import { Button } from '@chakra-ui/react';
import ComponentWithPrompt from './ComponentWithPrompt';

export interface UnlockProps {
  locked: boolean;
  disabled?: boolean;
  lockAction: () => any;
  unlockAction: (res: string) => any;
}

/**
 * A lock button that has two actions in two states
 * and one of them requires a prompt
 * @param locked The lock state
 * @param disabled The disable state of the buttons (Optional)
 * @param lockAction Action performed when is locked
 * @param unlockAction Action performed when is unlocked
 */
const Unlock: FC<UnlockProps> = (props) => {
  return (
    <>
      {props.locked ? (
        <ComponentWithPrompt
          title="Unlock"
          type="password"
          action={props.unlockAction}
          disabled={props.disabled}
        >
          <Button
            colorScheme="blue"
            variant="outline"
            isDisabled={props.disabled}
          >
            Unlock
          </Button>
        </ComponentWithPrompt>
      ) : (
        <Button
          colorScheme="blue"
          variant="outline"
          isDisabled={props.disabled}
          onClick={props.lockAction}
        >
          Lock
        </Button>
      )}
    </>
  );
};

export default Unlock;
