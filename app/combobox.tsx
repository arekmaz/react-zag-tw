/* eslint-disable jsx-a11y/label-has-associated-control */
import { mergeProps, normalizeProps, useMachine } from '@zag-js/react';
import * as combobox from '@zag-js/combobox';
import { createHookContext } from './machine-ctx.tsx';
import { ComponentProps, useId, useState } from 'react';

export const [useCombobox, ComboboxProvider, ComboboxContext] =
  createHookContext((ctx: combobox.Context) => {
    const [state, send] = useMachine(combobox.machine(ctx));
    const api = combobox.connect(state, send, normalizeProps);
    return api;
  });

export const ComboboxConsumer = ComboboxContext.Consumer;

export const ComboboxRoot = (props: ComponentProps<'div'>) => (
  <div
    {...mergeProps(
      useCombobox().getRootProps(),
      { className: ['flex w-full flex-col gap-1.5'].join(' ') },
      props
    )}
  />
);

export const ComboboxLabel = (props: ComponentProps<'label'>) => (
  <label
    {...mergeProps(
      useCombobox().getLabelProps(),
      {
        className: [
          'text-foreground',
          'font-medium',
          '_disabled:text-muted-foreground',
        ].join(' '),
      },
      props
    )}
  />
);

export const ComboboxControl = (props: ComponentProps<'div'>) => (
  <div
    {...mergeProps(
      useCombobox().getControlProps(),
      { className: 'relative' },
      props
    )}
  />
);

export const ComboboxInput = (props: ComponentProps<'input'>) => (
  <input
    {...mergeProps(
      useCombobox().getInputProps(),
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
          'px-3',
          'h-11',
          'min-w-11',
          'text-base',
          'text-md',
          'h-10',
          'min-w-10',
          'px-3',
        ].join(' '),
      },
      props
    )}
  />
);

export const ComboboxTrigger = (props: ComponentProps<'button'>) => (
  <button
    {...mergeProps(
      useCombobox().getTriggerProps(),
      {
        className: [
          'bottom-0',
          'text-muted-foreground',
          'absolute',
          'top-0',
          'size-4',
          'h-full',
          'cursor-pointer',
          '_disabled:cursor-not-allowed',
          '_disabled:opacity-50',
          'right-3',
        ].join(' '),
      },
      props
    )}
  />
);

export const ComboboxPositioner = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useCombobox().getPositionerProps(), props)} />
);

export const ComboboxContent = (props: ComponentProps<'ul'>) => (
  <ul
    {...mergeProps(
      useCombobox().getContentProps(),
      {
        className: [
          'bg-popover',
          'rounded-md',
          'shadow-lg',
          'flex',
          'flex-col',
          'z-dropdown',
          '_hidden:hidden',
          'data-[state=closed]:opacity-0',
          'data-[state=open]:opacity-1',
          'transition-opacity',
          'duration-slowest',
          'ease-out',
          'ring-1',
          'ring-border',
          'outline-muted',
          'gap-1',
          'p-1',
        ].join(' '),
      },
      props
    )}
  />
);

export const ComboboxItem = ({
  item,
  ...props
}: { item: { label: string; code: string } } & ComponentProps<'li'>) => (
  <li
    {...mergeProps(
      useCombobox().getItemProps({ item }),
      {
        className: [
          'items-center',
          'rounded-md',
          'cursor-pointer',
          'flex',
          'justify-between',
          'transition-all',
          'duration-faster',
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

export function Combobox() {
  const comboboxData = [
    { label: 'Zambia', code: 'ZA' },
    { label: 'Benin', code: 'BN' },
  ];

  const [options, setOptions] = useState(comboboxData);

  const collection = combobox.collection({
    items: options,
    itemToValue: (item) => item.code,
    itemToString: (item) => item.label,
  });

  return (
    <ComboboxProvider
      id={useId()}
      collection={collection}
      onOpenChange={() => {
        setOptions(comboboxData);
      }}
      onInputValueChange={({ inputValue }) => {
        const filtered = comboboxData.filter((item) =>
          item.label.toLowerCase().includes(inputValue.toLowerCase())
        );
        setOptions(filtered.length > 0 ? filtered : comboboxData);
      }}
    >
      <ComboboxRoot>
        <ComboboxLabel>Select country</ComboboxLabel>
        <ComboboxControl>
          <ComboboxInput placeholder="country" />
          <ComboboxTrigger>▼</ComboboxTrigger>
        </ComboboxControl>
        <ComboboxPositioner>
          {options.length > 0 && (
            <ComboboxContent>
              {options.map((item) => (
                <ComboboxItem key={item.code} item={item}>
                  {item.label}
                </ComboboxItem>
              ))}
            </ComboboxContent>
          )}
        </ComboboxPositioner>
      </ComboboxRoot>
    </ComboboxProvider>
  );
}
