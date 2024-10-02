/* eslint-disable jsx-a11y/label-has-associated-control */
import { normalizeProps, Portal, useMachine } from '@zag-js/react';
import * as select from '@zag-js/select';
import { ComponentProps, createContext, PropsWithChildren, useContext, useId } from 'react';
import { tv, VariantProps, } from 'tailwind-variants';

const selectData = [
  { label: 'Nigeria', value: 'NG' },
  { label: 'Japan', value: 'JP' },
  { label: 'Korea', value: 'KO' },
  { label: 'Kenya', value: 'KE' },
  { label: 'United Kingdom', value: 'UK' },
  { label: 'Ghana', value: 'GH' },
  { label: 'Uganda', value: 'UG' },
];

export const createHookContext = <Props extends Record<string, unknown>, O>(
  hook: (a: Props) => O
) => {
  const defaultValue = {};
  const Context = createContext<O>(defaultValue as O);

  const Provider = ({ children, ...props }: PropsWithChildren<Props>) => {
    const output = hook(props as Props);
    return <Context.Provider value={output}>{children}</Context.Provider>;
  };

  const useCtx = () => {
    const val = useContext(Context);

    if (val === defaultValue) {
      throw new Error('hook used outside of the provider');
    }

    return val;
  };

  return [Provider, useCtx, Context];
};

const useSelectApi = (ctx: select.Context) => {
  const [state, send] = useMachine(select.machine(ctx));

  const api = select.connect(state, send, normalizeProps);

  return api;
};

const [useSelect, SelectProvider] = createHookContext(useSelectApi);

export const inputClasses = ([
  "w-full",
  "rounded-md",
  "border",
  "border-input",
  "bg-background",
  "ring-offset-background",
  "file:border-0",
  "file:bg-transparent",
  "file:text-sm",
  "file:font-medium",
  "placeholder-muted-foreground",
  "focus-visible:outline-none",
  "focus-visible:ring-2",
  "focus-visible:ring-ring",
  "focus-visible:ring-offset-2",
  "_disabled:cursor-not-allowed",
  "_disabled:opacity-50",
  "_invalid:text-destructive",
  "_invalid:placeholder-destructive/50",
  "_invalid:border-destructive",
]);


const selectStyles = tv({
  slots: {
    root: "flex w-full flex-col gap-1.5",
    label: "font-medium",
    control: "relative cursor-pointer bg-background",
    indicator: "size-4 text-muted-foreground",
    trigger: [
      ...inputClasses,
      "flex",
      "justify-between",
      "items-center",
      "px-3",
      "h-10",
      "min-w-10",
      "text-md",
      "group/select-trigger",
    ],
    valueText: [
      "flex",
      "gap-1",
      "flex-row",
      "whitespace-nowrap",
      "group-data-[disabled]/select-trigger:text-muted-foreground",
      "whitespace-nowrap",
    ],
    filterInput: [
      "h-10",
      "w-full",
      "border-b",
      "border-input",
      "bg-transparent",
      "px-3",
      "py-2",
      "text-sm",
      "ring-offset-background",
      "file:border-0",
      "file:text-sm",
      "file:font-medium",
      "placeholder-muted-foreground",
      "focus-visible:outline-none",
      "_disabled:cursor-not-allowed",
      "_disabled:opacity-50",
      "px-3",
      "h-11",
      "min-w-11",
    ],
    clearTrigger: "",
    positioner: "",
    content: [
      "overflow-hidden",
      "bg-popover",
      "rounded-md",
      "shadow-lg",
      "flex",
      "flex-col",
      "z-dropdown",
      "data-[state=closed]:animate-fade-out",
      "data-[state=open]:animate-fade-in",
      "_hidden:hidden",
      "border",
      "focus-visible:outline",
      "focus-visible:outline-offset-2",
      "focus-visible:outline-2",
      "focus-visible:outline-offset-2",
      "focus-visible:outline-foreground",
    ],
    itemGroup: "",
    itemGroupLabel: "px-2 py-1.5 text-sm font-semibold",
    item: [
      "items-center",
      "rounded-md",
      "cursor-pointer",
      "flex",
      "justify-between",
      "transition-all",
      "duration-faster",
      "hover:bg-muted",
      "data-[highlighted]:bg-accent",
      "_disabled:text-muted-foreground",
      "_disabled:cursor-not-allowed",
      "_disabled:hover:bg-transparent",
    ],
    itemText: "",
    itemIndicator: "",
  },
  variants: {
    size: {
      md: {
        content: "gap-1",
        item: "text-md h-10 px-2",
        itemGroupLabel: "px-2 py-1.5",
        filterInput: "text-md h-10 min-w-10 px-3",
        trigger: "text-md h-10 min-w-52 px-3",
        itemGroup: "px-1 pb-1",
      },
    },
    variant: {
      default: {
        label: ["text-foreground"],
        valueText: [
          "group-data-[placeholder-shown]/select-trigger:text-muted-foreground",
        ],
      },
      error: {
        root: [],
        label: ["text-destructive"],
        valueText: [
          "text-destructive",
          "group-data-[placeholder-shown]/select-trigger:text-destructive/50",
        ],
        trigger: ["border-destructive"],
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

type SelectVariantProps = VariantProps<typeof selectStyles>


export const SelectRoot = (props: ComponentProps<'div'> & SelectVariantProps)

export function Select() {
  const collection = select.collection({
    items: selectData,
    itemToString: (item) => item.label,
    itemToValue: (item) => item.value,
  });

  const [state, send] = useMachine(
    select.machine({
      id: useId(),
      collection,
    })
  );

  const api = select.connect(state, send, normalizeProps);

  return (
    <div {...api.getRootProps()}>
      <div {...api.getControlProps()}>
        <label {...api.getLabelProps()}>Label</label>
        <button {...api.getTriggerProps()}>
          {api.valueAsString || 'Select option'}
        </button>
      </div>

      <Portal>
        <div {...api.getPositionerProps()}>
          <ul {...api.getContentProps()}>
            {selectData.map((item) => (
              <li key={item.value} {...api.getItemProps({ item })}>
                <span>{item.label}</span>
                <span {...api.getItemIndicatorProps({ item })}>✓</span>
              </li>
            ))}
          </ul>
        </div>
      </Portal>
    </div>
  );
}
