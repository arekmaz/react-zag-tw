import * as popover from '@zag-js/popover';
import { mergeProps, normalizeProps, Portal, useMachine } from '@zag-js/react';
import { ComponentProps, Fragment, useId } from 'react';
import { createHookContext } from './machine-ctx';

export const [usePopover, PopoverProvider, PopoverContext] = createHookContext(
  (ctx: popover.Context) => {
    const [state, send] = useMachine(popover.machine(ctx));

    const api = popover.connect(state, send, normalizeProps);

    return api;
  }
);

export const PopoverConsumer = PopoverContext.Consumer;

export const PopoverTrigger = (props: ComponentProps<'button'>) => (
  <button {...mergeProps(usePopover().getTriggerProps(), props)} />
);

export const PopoverCloseTrigger = (props: ComponentProps<'button'>) => (
  <button {...mergeProps(usePopover().getCloseTriggerProps(), props)} />
);

export const PopoverPositioner = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(usePopover().getPositionerProps(), props)} />
);

export const PopoverContent = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(usePopover().getContentProps(), props)} />
);

export const PopoverTitle = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(usePopover().getTitleProps(), props)} />
);

export const PopoverDescription = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(usePopover().getDescriptionProps(), props)} />
);

export function Popover() {
  return (
    <PopoverProvider id={useId()}>
      <div>
        <PopoverTrigger>Click me</PopoverTrigger>
        <PopoverConsumer>
          {(api) => {
            const Wrapper = api.portalled ? Portal : Fragment;

            return (
              <Wrapper>
                <PopoverPositioner>
                  <PopoverContent>
                    <PopoverTitle>Presenters</PopoverTitle>
                    <PopoverDescription>Description</PopoverDescription>
                    <button>Action Button</button>
                    <PopoverCloseTrigger>X</PopoverCloseTrigger>
                  </PopoverContent>
                </PopoverPositioner>
              </Wrapper>
            );
          }}
        </PopoverConsumer>
      </div>
    </PopoverProvider>
  );
}
