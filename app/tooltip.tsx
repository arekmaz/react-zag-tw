import * as tooltip from '@zag-js/tooltip';
import { useMachine, normalizeProps, mergeProps } from '@zag-js/react';
import { ComponentProps, useId } from 'react';
import { createHookContext } from './machine-ctx';

export const [useTooltip, TooltipProvider, TooltipContext] = createHookContext(
  (ctx: tooltip.Context) => {
    const [state, send] = useMachine(tooltip.machine(ctx));

    const api = tooltip.connect(state, send, normalizeProps);

    return api;
  }
);

export const TooltipConsumer = TooltipContext.Consumer;

export const TooltipTrigger = (props: ComponentProps<'button'>) => (
  <button {...mergeProps(useTooltip().getTriggerProps(), props)} />
);

export const TooltipPositioner = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useTooltip().getPositionerProps(), props)} />
);

export const TooltipContent = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useTooltip().getContentProps(), props)} />
);

export function Tooltip() {
  return (
    <TooltipProvider id={useId()}>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipConsumer>
        {(api) =>
          api.open && (
            <TooltipPositioner>
              <TooltipContent>Tooltip</TooltipContent>
            </TooltipPositioner>
          )
        }
      </TooltipConsumer>
    </TooltipProvider>
  );
}
