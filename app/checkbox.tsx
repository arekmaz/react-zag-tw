/* eslint-disable jsx-a11y/label-has-associated-control */
import { mergeProps, normalizeProps, useMachine } from '@zag-js/react';
import * as checkbox from '@zag-js/checkbox';
import { createHookContext } from './machine-ctx';
import { ComponentProps } from 'react';

export const [useCheckbox, CheckboxProvider, CheckboxContext] =
  createHookContext((ctx: checkbox.Context) => {
    const [state, send] = useMachine(checkbox.machine(ctx));
    const api = checkbox.connect(state, send, normalizeProps);
    return api;
  });

export const CheckboxConsumer = CheckboxContext.Consumer;

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

export const HiddenCheckboxInput = (props: ComponentProps<'input'>) => (
  <input {...mergeProps(useCheckbox().getHiddenInputProps(), props)} />
);

const CI = (props: ComponentProps<'svg'>) => (
  <svg
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function Checkbox() {
  return (
    <CheckboxProvider id="1">
      <CheckboxRoot>
        <CheckboxLabel>
          <CheckboxConsumer>
            {(api) => `Input is ${api.checked ? 'checked' : 'unchecked'}`}
          </CheckboxConsumer>
        </CheckboxLabel>
        <CheckboxControl>
          <CheckboxConsumer>{(api) => api.checked && <CI />}</CheckboxConsumer>
        </CheckboxControl>
        <HiddenCheckboxInput />
      </CheckboxRoot>
    </CheckboxProvider>
  );
}
