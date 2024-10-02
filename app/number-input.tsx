/* eslint-disable jsx-a11y/label-has-associated-control */
import * as numberInput from '@zag-js/number-input';
import { mergeProps, normalizeProps, useMachine } from '@zag-js/react';
import { ComponentProps, useId } from 'react';
import { createHookContext } from './machine-ctx';

export const [useNumberInput, NumberInputProvider, NumberInputContext] =
  createHookContext((ctx: numberInput.Context) => {
    const [state, send] = useMachine(numberInput.machine(ctx));

    const api = numberInput.connect(state, send, normalizeProps);

    return api;
  });

export const NumberInputConsumer = NumberInputContext.Consumer;

export const NumberInputRoot = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useNumberInput().getRootProps(), props)} />
);

export const NumberInputLabel = (props: ComponentProps<'label'>) => (
  <label {...mergeProps(useNumberInput().getLabelProps(), props)} />
);

export const NumberInputDecrementTrigger = (
  props: ComponentProps<'button'>
) => (
  <button {...mergeProps(useNumberInput().getDecrementTriggerProps(), props)} />
);

export const NumberInputIncrementTrigger = (
  props: ComponentProps<'button'>
) => (
  <button {...mergeProps(useNumberInput().getIncrementTriggerProps(), props)} />
);

export const NumberInputInput = (props: ComponentProps<'input'>) => (
  <input {...mergeProps(useNumberInput().getInputProps(), props)} />
);

export function NumberInput() {
  return (
    <NumberInputProvider id={useId()}>
      <NumberInputRoot>
        <NumberInputLabel>Enter number:</NumberInputLabel>
        <div>
          <NumberInputDecrementTrigger>DEC</NumberInputDecrementTrigger>
          <NumberInputInput />
          <NumberInputIncrementTrigger>INC</NumberInputIncrementTrigger>
        </div>
      </NumberInputRoot>
    </NumberInputProvider>
  );
}
