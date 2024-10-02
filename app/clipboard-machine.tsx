import { mergeProps, normalizeProps, useMachine } from '@zag-js/react';
import * as clipboard from '@zag-js/clipboard';
import { ClipboardCheck, ClipboardCopyIcon } from 'lucide-react';
import { createHookContext } from './machine-ctx';
import { ComponentProps, useId } from 'react';

// Create hook context for clipboard
export const [useClipboard, ClipboardProvider, ClipboardContext] =
  createHookContext((ctx: clipboard.Context) => {
    const [state, send] = useMachine(clipboard.machine(ctx));
    const api = clipboard.connect(state, send, normalizeProps);
    return api;
  });

export const ClipboardConsumer = ClipboardContext.Consumer;

// Clipboard Root Component
export const ClipboardRoot = (props: ComponentProps<'div'>) => (
  <div
    {...mergeProps(
      useClipboard().getRootProps(),
      {
        className: 'flex flex-col gap-2',
      },
      props
    )}
  />
);

// Clipboard Label Component
export const ClipboardLabel = (props: ComponentProps<'label'>) => (
  <label
    {...mergeProps(
      useClipboard().getLabelProps(),
      {
        className: 'text-sm font-medium',
      },
      props
    )}
  />
);

// Clipboard Control Wrapper Component
export const ClipboardControl = (props: ComponentProps<'div'>) => (
  <div
    {...mergeProps(
      useClipboard().getControlProps(),
      {
        className: 'flex items-center gap-2',
      },
      props
    )}
  />
);

// Clipboard Input Component
export const ClipboardInput = (props: ComponentProps<'input'>) => (
  <input
    {...mergeProps(
      useClipboard().getInputProps(),
      {
        className: 'border border-gray-300 rounded-md px-2 py-1',
      },
      props
    )}
  />
);

// Clipboard Trigger Button Component
export const ClipboardTrigger = (props: ComponentProps<'button'>) => (
  <button
    {...mergeProps(
      useClipboard().getTriggerProps(),
      {
        className: 'p-1 rounded-md border border-transparent hover:bg-gray-100',
      },
      props
    )}
  >
    <ClipboardConsumer>
      {(api) => (api.copied ? <ClipboardCheck /> : <ClipboardCopyIcon />)}
    </ClipboardConsumer>
  </button>
);

// Full Clipboard Component
export function Clipboard() {
  return (
    <ClipboardProvider id={useId()} value="https://github.com/chakra-ui/zag">
      <ClipboardRoot>
        <ClipboardLabel>Copy this link</ClipboardLabel>
        <ClipboardControl>
          <ClipboardInput />
          <ClipboardTrigger />
        </ClipboardControl>
      </ClipboardRoot>
    </ClipboardProvider>
  );
}
