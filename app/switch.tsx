/* eslint-disable jsx-a11y/label-has-associated-control */
import * as zagSwitch from '@zag-js/switch';
import { useMachine, normalizeProps, mergeProps } from '@zag-js/react';
import { useId, ComponentProps } from 'react';
import { createHookContext } from './machine-ctx';

export const [useSwitch, SwitchProvider, SwitchContext] = createHookContext(
  (ctx: zagSwitch.Context) => {
    const [state, send] = useMachine(zagSwitch.machine(ctx));

    const api = zagSwitch.connect(state, send, normalizeProps);

    return api;
  }
);

export const SwitchConsumer = SwitchContext.Consumer;

export const SwitchRoot = (props: ComponentProps<'label'>) => (
  <label {...mergeProps(useSwitch().getRootProps(), props)} />
);

export const SwitchHiddenInput = (props: ComponentProps<'input'>) => (
  <input {...mergeProps(useSwitch().getHiddenInputProps(), props)} />
);

export const SwitchControl = (props: ComponentProps<'span'>) => (
  <span {...mergeProps(useSwitch().getControlProps(), props)} />
);

export const SwitchThumb = (props: ComponentProps<'span'>) => (
  <span {...mergeProps(useSwitch().getThumbProps(), props)} />
);

export const SwitchLabel = (props: ComponentProps<'span'>) => (
  <span {...mergeProps(useSwitch().getLabelProps(), props)} />
);

export function Switch() {
  return (
    <SwitchProvider id={useId()}>
      <SwitchRoot>
        <SwitchHiddenInput />
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
        <SwitchConsumer>
          {(api) => <SwitchLabel>{api.checked ? 'On' : 'Off'}</SwitchLabel>}
        </SwitchConsumer>
      </SwitchRoot>
    </SwitchProvider>
  );
}
