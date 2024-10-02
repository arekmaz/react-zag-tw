/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/heading-has-content */
import * as radio from '@zag-js/radio-group';
import { useMachine, normalizeProps, mergeProps } from '@zag-js/react';
import { useId, ComponentProps } from 'react';
import { createHookContext } from './machine-ctx';

export const [useRadioGroup, RadioGroupProvider, RadioGroupContext] =
  createHookContext((ctx: radio.Context) => {
    const [state, send] = useMachine(radio.machine(ctx));

    const api = radio.connect(state, send, normalizeProps);

    return api;
  });

export const RadioGroupConsumer = RadioGroupContext.Consumer;

export const RadioGroupRoot = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useRadioGroup().getRootProps(), props)} />
);

export const RadioGroupLabel = (props: ComponentProps<'h3'>) => (
  <h3 {...mergeProps(useRadioGroup().getLabelProps(), props)} />
);

export const RadioGroupItem = ({
  value,
  ...props
}: ComponentProps<'label'> & radio.ItemProps) => (
  <label {...mergeProps(useRadioGroup().getItemProps({ value }), props)} />
);

export const RadioGroupItemText = ({
  value,
  ...props
}: ComponentProps<'span'> & radio.ItemProps) => (
  <span {...mergeProps(useRadioGroup().getItemTextProps({ value }), props)} />
);

export const RadioGroupItemHiddenInput = ({
  value,
  ...props
}: ComponentProps<'input'> & radio.ItemProps) => (
  <input
    {...mergeProps(useRadioGroup().getItemHiddenInputProps({ value }), props)}
  />
);

export const RadioGroupItemControl = ({
  value,
  ...props
}: ComponentProps<'div'> & radio.ItemProps) => (
  <div
    {...mergeProps(useRadioGroup().getItemHiddenInputProps({ value }), props)}
  />
);

export const RadioGroupIndicator = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useRadioGroup().getIndicatorProps(), props)} />
);

const items = [
  { id: 'apple', label: 'Apples' },
  { id: 'orange', label: 'Oranges' },
  { id: 'mango', label: 'Mangoes' },
  { id: 'grape', label: 'Grapes' },
];

export function Radio() {
  return (
    <RadioGroupProvider id={useId()}>
      <RadioGroupRoot>
        <RadioGroupLabel>Fruits</RadioGroupLabel>
        {items.map((opt) => (
          <RadioGroupItem key={opt.id} value={opt.id}>
            <RadioGroupItemText value={opt.id}>{opt.label}</RadioGroupItemText>
            <RadioGroupItemHiddenInput value={opt.id} />
            <RadioGroupItemControl value={opt.id} />
          </RadioGroupItem>
        ))}
      </RadioGroupRoot>
    </RadioGroupProvider>
  );
}

export function SegmentedControl() {
  return (
    <RadioGroupProvider id={useId()}>
      <RadioGroupRoot>
        <RadioGroupIndicator />
        {items.map((opt) => (
          <RadioGroupItem key={opt.id} value={opt.id}>
            <RadioGroupItemText value={opt.id}>{opt.label}</RadioGroupItemText>
            <RadioGroupItemHiddenInput value={opt.id} />
          </RadioGroupItem>
        ))}
      </RadioGroupRoot>
    </RadioGroupProvider>
  );
}
