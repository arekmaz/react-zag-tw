import { mergeProps, normalizeProps, useMachine } from '@zag-js/react';
import * as checkbox from '@zag-js/checkbox';
import { createHookContext } from './machine-ctx';
import { ComponentProps } from 'react';

// Create hook context for checkbox
export const [useCheckbox, CheckboxProvider, CheckboxContext] =
  createHookContext((ctx: checkbox.Context) => {
    const [state, send] = useMachine(checkbox.machine(ctx));
    const api = checkbox.connect(state, send, normalizeProps);
    return api;
  });

export const CheckboxConsumer = CheckboxContext.Consumer;

// Checkbox Root Component
export const CheckboxRoot = (props: ComponentProps<'label'>) => (
  <label
    {...mergeProps(
      useCheckbox().getRootProps(),
      {
        className: 'flex items-center gap-2',
      },
      props
    )}
  />
);

// Checkbox Label Component
export const CheckboxLabel = (props: ComponentProps<'span'>) => (
  <span
    {...mergeProps(
      useCheckbox().getLabelProps(),
      {
        className: 'text-sm font-medium',
      },
      props
    )}
  />
);

// Checkbox Control Component
export const CheckboxControl = (props: ComponentProps<'div'>) => (
  <div
    {...mergeProps(
      useCheckbox().getControlProps(),
      {
        className: 'w-4 h-4 border border-gray-300 rounded',
      },
      props
    )}
  />
);

// Hidden Input Component
export const HiddenCheckboxInput = (props: ComponentProps<'input'>) => (
  <input {...mergeProps(useCheckbox().getHiddenInputProps(), props)} />
);

// Full Checkbox Component
export function Checkbox() {
  return (
    <CheckboxProvider id="1">
      <CheckboxRoot>
        <CheckboxLabel>
          <CheckboxConsumer>
            {(api) => `Input is ${api.checked ? 'checked' : 'unchecked'}`}
          </CheckboxConsumer>
        </CheckboxLabel>
        <CheckboxControl />
        <HiddenCheckboxInput />
      </CheckboxRoot>
    </CheckboxProvider>
  );
}
