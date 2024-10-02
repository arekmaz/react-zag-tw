import { mergeProps, normalizeProps, useMachine } from '@zag-js/react';
import * as toggle from '@zag-js/toggle-group';
import { ComponentProps, useId } from 'react';
import { createHookContext } from './machine-ctx';

export const [useToggleGroup, ToggleGroupProvider, ToggleGroupContext] =
  createHookContext((ctx: toggle.Context) => {
    const [state, send] = useMachine(toggle.machine(ctx));

    const api = toggle.connect(state, send, normalizeProps);

    return api;
  });

export const ToggleGroupConsumer = ToggleGroupContext.Consumer;

export const ToggleGroupRoot = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useToggleGroup().getRootProps(), props)} />
);

export const ToggleGroupItem = ({
  value,
  ...props
}: ComponentProps<'button'> & toggle.ItemProps) => (
  <button {...mergeProps(useToggleGroup().getItemProps({ value }), props)} />
);

export function ToggleGroup() {
  return (
    <ToggleGroupProvider id={useId()}>
      <ToggleGroupRoot>
        <ToggleGroupItem value="bold">B</ToggleGroupItem>
        <ToggleGroupItem value="italic">I</ToggleGroupItem>
        <ToggleGroupItem value="underline">U</ToggleGroupItem>
      </ToggleGroupRoot>
    </ToggleGroupProvider>
  );
}
