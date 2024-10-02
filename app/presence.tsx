import * as presence from '@zag-js/presence';
import { normalizeProps, useMachine } from '@zag-js/react';
import { createHookContext } from './machine-ctx';
import { ReactNode } from 'react';

export const [usePresence, PresenceProvider, PresenceContext] =
  createHookContext((ctx: presence.Context) => {
    const [state, send] = useMachine(presence.machine(ctx));

    const api = presence.connect(state, send, normalizeProps);

    return api;
  });

export const PresenceConsumer = PresenceContext.Consumer;

interface PresenceProps {
  present: boolean;
  unmountOnExit?: boolean;
  onExitComplete?: () => void;
  children: ReactNode;
}

export function Presence(props: PresenceProps) {
  const { unmountOnExit, present, onExitComplete, ...rest } = props;

  return (
    <PresenceProvider present={present} onExitComplete={onExitComplete}>
      <PresenceConsumer>
        {(api) => {
          if (!api.present && unmountOnExit) {
            return null;
          }

          return (
            <div
              hidden={!api.present}
              data-state={api.skip ? undefined : present ? 'open' : 'closed'}
              ref={api.setNode}
              {...rest}
            />
          );
        }}
      </PresenceConsumer>
    </PresenceProvider>
  );
}
