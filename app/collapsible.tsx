import { mergeProps, normalizeProps, useMachine } from '@zag-js/react';
import * as collapsible from '@zag-js/collapsible';
import { createHookContext } from './machine-ctx';
import { ComponentProps, useId } from 'react';

// Create hook context for collapsible
export const [useCollapsible, CollapsibleProvider, CollapsibleContext] =
  createHookContext((ctx: collapsible.Context) => {
    const [state, send] = useMachine(collapsible.machine(ctx));
    const api = collapsible.connect(state, send, normalizeProps);
    return api;
  });

export const CollapsibleConsumer = CollapsibleContext.Consumer;

// Collapsible Root Component
export const CollapsibleRoot = (props: ComponentProps<'div'>) => (
  <div
    {...mergeProps(
      useCollapsible().getRootProps(),
      {
        className: 'flex flex-col gap-2',
      },
      props
    )}
  />
);

// Collapsible Trigger Component
export const CollapsibleTrigger = (props: ComponentProps<'button'>) => (
  <button
    {...mergeProps(
      useCollapsible().getTriggerProps(),
      {
        className: 'text-left font-medium focus:outline-none',
      },
      props
    )}
  >
    {props.children}
  </button>
);

// Collapsible Content Component
export const CollapsibleContent = (props: ComponentProps<'div'>) => (
  <div
    {...mergeProps(
      useCollapsible().getContentProps(),
      {
        className: 'mt-2',
      },
      props
    )}
  >
    {props.children}
  </div>
);

// Full Collapsible Component
export function Collapsible() {
  return (
    <CollapsibleProvider id={useId()}>
      <CollapsibleRoot>
        <CollapsibleTrigger>Collapse Trigger</CollapsibleTrigger>
        <CollapsibleContent>Collapse Content</CollapsibleContent>
      </CollapsibleRoot>
    </CollapsibleProvider>
  );
}
