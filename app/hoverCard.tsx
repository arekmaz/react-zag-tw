/* eslint-disable jsx-a11y/anchor-has-content */
import * as hoverCard from '@zag-js/hover-card';
import { mergeProps, normalizeProps, Portal, useMachine } from '@zag-js/react';
import { ComponentProps, useId } from 'react';
import { createHookContext } from './machine-ctx';

export const [useHoverCard, HoverCardProvider, HoverCardContext] =
  createHookContext((ctx: hoverCard.Context) => {
    const [state, send] = useMachine(hoverCard.machine(ctx));

    const api = hoverCard.connect(state, send, normalizeProps);

    return api;
  });

export const HoverCardConsumer = HoverCardContext.Consumer;

export const HoverCardTrigger = (props: ComponentProps<'a'>) => (
  <a {...mergeProps(useHoverCard().getTriggerProps(), props)} />
);

export const HoverCardPositioner = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useHoverCard().getPositionerProps(), props)} />
);

export const HoverCardContent = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useHoverCard().getContentProps(), props)} />
);

export const HoverCardArrow = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useHoverCard().getArrowProps(), props)} />
);

export const HoverCardArrowTip = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useHoverCard().getArrowTipProps(), props)} />
);

export function HoverCard() {
  return (
    <HoverCardProvider id={useId()}>
      <HoverCardTrigger href="https://twitter.com/zag_js" target="_blank">
        Twitter
      </HoverCardTrigger>

      <HoverCardConsumer>
        {(api) =>
          api.open && (
            <Portal>
              <HoverCardPositioner>
                <HoverCardContent>
                  <HoverCardArrow>
                    <HoverCardArrowTip />
                  </HoverCardArrow>
                  Twitter Preview
                </HoverCardContent>
              </HoverCardPositioner>
            </Portal>
          )
        }
      </HoverCardConsumer>
    </HoverCardProvider>
  );
}
