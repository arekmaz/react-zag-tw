/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { normalizeProps, Portal, useMachine, mergeProps } from '@zag-js/react';
import * as select from '@zag-js/select';
import { ComponentProps, useId } from 'react';
import { createHookContext } from './machine-ctx';

const selectData = [
  { label: 'Nigeria', value: 'NG' },
  { label: 'Japan', value: 'JP' },
  { label: 'Korea', value: 'KO' },
  { label: 'Kenya', value: 'KE' },
  { label: 'United Kingdom', value: 'UK' },
  { label: 'Ghana', value: 'GH' },
  { label: 'Uganda', value: 'UG' },
];

type CollectionItem = unknown;

export const [useSelect, SelectProvider, SelectContext] = createHookContext(
  (ctx: select.Context<CollectionItem>) => {
    const [state, send] = useMachine(select.machine(ctx));

    const api = select.connect(state, send, normalizeProps);

    return api;
  }
);

export const SelectConsumer = SelectContext.Consumer;

export const SelectRoot = (props: ComponentProps<'div'>) => (
  <div
    {...mergeProps(
      useSelect().getRootProps(),
      {
        className: 'flex w-full flex-col gap-1.5',
      },
      props
    )}
  />
);

export const SelectControl = (props: ComponentProps<'div'>) => (
  <div
    {...mergeProps(
      useSelect().getControlProps(),
      {
        className: 'relative cursor-pointer bg-background',
      },
      props
    )}
  />
);

export const SelectLabel = (props: ComponentProps<'label'>) => (
  <label
    {...mergeProps(
      useSelect().getLabelProps(),
      {
        className: 'font-medium text-foreground',
      },
      props
    )}
  />
);

export const SelectTrigger = (props: ComponentProps<'button'>) => (
  <button
    {...mergeProps(
      useSelect().getTriggerProps(),
      {
        className: [
          'w-full',
          'rounded-md',
          'border',
          'border-input',
          'bg-background',
          'ring-offset-background',
          'file:border-0',
          'file:bg-transparent',
          'file:text-sm',
          'file:font-medium',
          'placeholder-muted-foreground',
          'focus-visible:outline-none',
          'focus-visible:ring-2',
          'focus-visible:ring-ring',
          'focus-visible:ring-offset-2',
          '_disabled:cursor-not-allowed',
          '_disabled:opacity-50',
          '_invalid:text-destructive',
          '_invalid:placeholder-destructive/50',
          '_invalid:border-destructive',
          'flex',
          'justify-between',
          'items-center',
          'px-3',
          'h-10',
          'min-w-10',
          'text-md',
          'group/select-trigger',
          'text-md h-10 min-w-52 px-3',
        ].join(' '),
      },
      props
    )}
  />
);

export const SelectPositioner = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useSelect().getPositionerProps(), props)} />
);

export const SelectContent = (props: ComponentProps<'ul'>) => (
  <ul
    {...mergeProps(
      useSelect().getContentProps(),
      {
        className: [
          'overflow-hidden',
          'bg-popover',
          'rounded-md',
          'shadow-lg',
          'z-dropdown',
          'data-[state=closed]:hidden',
          'data-[state=open]:flex',
          'flex-col',
          'border',
          'focus-visible:outline',
          'focus-visible:outline-offset-2',
          'focus-visible:outline-2',
          'focus-visible:outline-offset-2',
          'focus-visible:outline-foreground',
          'gap-1',
        ].join(' '),
      },
      props
    )}
  />
);

export const SelectItem = ({
  item,
  ...props
}: ComponentProps<'li'> & { item: any }) => (
  <li
    {...mergeProps(
      useSelect().getItemProps({ item }),
      {
        className: [
          'items-center',
          'rounded-md',
          'cursor-pointer',
          'flex',
          'justify-between',
          'transition-all',
          'duration-faster',
          'hover:bg-muted',
          'data-[highlighted]:bg-accent',
          '_disabled:text-muted-foreground',
          '_disabled:cursor-not-allowed',
          '_disabled:hover:bg-transparent',
          'text-md',
          'h-10',
          'px-2',
        ].join(' '),
      },
      props
    )}
  />
);

export const SelectItemIndicator = ({
  item,
  ...props
}: ComponentProps<'span'> & { item: any }) => (
  <span
    {...mergeProps(
      useSelect().getItemIndicatorProps({ item }),
      {
        className: 'size-4 text-muted-foreground',
      },
      props
    )}
  />
);

export function Select() {
  const collection = select.collection({
    items: selectData,
    itemToString: (item) => item.label,
    itemToValue: (item) => item.value,
  });

  return (
    <SelectProvider id={useId()} collection={collection}>
      <SelectRoot>
        <SelectControl>
          <SelectLabel>Label</SelectLabel>
          <SelectTrigger>
            <SelectConsumer>
              {(api) => api.valueAsString || 'Select option'}
            </SelectConsumer>
          </SelectTrigger>
        </SelectControl>

        <Portal>
          <SelectPositioner>
            <SelectContent>
              {selectData.map((item) => (
                <SelectItem key={item.value} item={item}>
                  <span>{item.label}</span>
                  <SelectItemIndicator item={item}>✓</SelectItemIndicator>
                </SelectItem>
              ))}
            </SelectContent>
          </SelectPositioner>
        </Portal>
      </SelectRoot>
    </SelectProvider>
  );
}
