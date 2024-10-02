import { mergeProps, normalizeProps, useMachine } from '@zag-js/react';
import * as combobox from '@zag-js/combobox';
import { createHookContext } from './machine-ctx';
import { ComponentProps, useId, useState } from 'react';

// Create hook context for combobox
export const [useCombobox, ComboboxProvider, ComboboxContext] =
  createHookContext((ctx: combobox.Context) => {
    const [state, send] = useMachine(combobox.machine(ctx));
    const api = combobox.connect(state, send, normalizeProps);
    return api;
  });

export const ComboboxConsumer = ComboboxContext.Consumer;

// Combobox Root Component
export const ComboboxRoot = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useCombobox().getRootProps(), props)} />
);

// Combobox Label Component
export const ComboboxLabel = (props: ComponentProps<'label'>) => (
  <label {...mergeProps(useCombobox().getLabelProps(), props)}>
    {props.children}
  </label>
);

// Combobox Control Component
export const ComboboxControl = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useCombobox().getControlProps(), props)}>
    {props.children}
  </div>
);

// Combobox Input Component
export const ComboboxInput = (props: ComponentProps<'input'>) => (
  <input {...mergeProps(useCombobox().getInputProps(), props)} />
);

// Combobox Trigger Component
export const ComboboxTrigger = (props: ComponentProps<'button'>) => (
  <button {...mergeProps(useCombobox().getTriggerProps(), props)}>▼</button>
);

// Combobox Positioner Component
export const ComboboxPositioner = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useCombobox().getPositionerProps(), props)} />
);

// Combobox Content Component
export const ComboboxContent = (props: ComponentProps<'ul'>) => (
  <ul {...mergeProps(useCombobox().getContentProps(), props)}>
    {props.children}
  </ul>
);

// Combobox Item Component
export const ComboboxItem = ({
  item,
  ...props
}: { item: { label: string; code: string } } & ComponentProps<'li'>) => (
  <li {...mergeProps(useCombobox().getItemProps({ item }), props)}>
    {item.label}
  </li>
);

// Full Combobox Component
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
          <ComboboxInput />
          <ComboboxTrigger />
        </ComboboxControl>
        <ComboboxPositioner>
          {options.length > 0 && (
            <ComboboxContent>
              {options.map((item) => (
                <ComboboxItem key={item.code} item={item} />
              ))}
            </ComboboxContent>
          )}
        </ComboboxPositioner>
      </ComboboxRoot>
    </ComboboxProvider>
  );
}
