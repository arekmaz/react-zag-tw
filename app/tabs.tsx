/* eslint-disable jsx-a11y/label-has-associated-control */
import * as tabs from '@zag-js/tabs';
import { useMachine, normalizeProps, mergeProps } from '@zag-js/react';
import { useId, ComponentProps } from 'react';
import { createHookContext } from './machine-ctx';

export const [useTabs, TabsProvider, TabsContext] = createHookContext(
  (ctx: tabs.Context) => {
    const [state, send] = useMachine(tabs.machine(ctx));

    const api = tabs.connect(state, send, normalizeProps);

    return api;
  }
);

export const TabsConsumer = TabsContext.Consumer;

export const TabsRoot = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useTabs().getRootProps(), props)} />
);

export const TabsList = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useTabs().getListProps(), props)} />
);

export const TabsTrigger = ({
  value,
  ...props
}: ComponentProps<'button'> & tabs.TriggerProps) => (
  <button {...mergeProps(useTabs().getTriggerProps({ value }), props)} />
);

export const TabsContent = ({
  value,
  ...props
}: ComponentProps<'button'> & tabs.ContentProps) => (
  <button {...mergeProps(useTabs().getContentProps({ value }), props)} />
);

const data = [
  { value: 'item-1', label: 'Item one', content: 'Item one content' },
  { value: 'item-2', label: 'Item two', content: 'Item two content' },
  { value: 'item-3', label: 'Item three', content: 'Item three content' },
];

export function Tabs() {
  return (
    <TabsProvider id={useId()} value="item-1">
      <TabsRoot>
        <TabsList>
          {data.map((item) => (
            <TabsTrigger key={item.value} value={item.value}>
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {data.map((item) => (
          <TabsContent key={item.value} value={item.value}>
            <p>{item.content}</p>
          </TabsContent>
        ))}
      </TabsRoot>
    </TabsProvider>
  );
}
