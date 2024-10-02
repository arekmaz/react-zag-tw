/* eslint-disable jsx-a11y/label-has-associated-control */
import * as rating from '@zag-js/rating-group';
import { useMachine, normalizeProps, mergeProps } from '@zag-js/react';

import { useId, ComponentProps } from 'react';
import { createHookContext } from './machine-ctx';
import { Star, StarHalf } from 'lucide-react';

export const [useRatingGroup, RatingGroupProvider, RatingGroupContext] =
  createHookContext((ctx: rating.Context) => {
    const [state, send] = useMachine(rating.machine(ctx));

    const api = rating.connect(state, send, normalizeProps);

    return api;
  });

export const RatingGroupConsumer = RatingGroupContext.Consumer;

export const RatingGroupRoot = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useRatingGroup().getRootProps(), props)} />
);

export const RatingGroupLabel = (props: ComponentProps<'label'>) => (
  <label {...mergeProps(useRatingGroup().getLabelProps(), props)} />
);

export const RatingGroupControl = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useRatingGroup().getControlProps(), props)} />
);

export const RatingGroupItem = ({
  index,
  ...props
}: ComponentProps<'span'> & rating.ItemProps) => (
  <div {...mergeProps(useRatingGroup().getItemProps({ index }), props)} />
);

export const RatingGroupHiddenInput = (props: ComponentProps<'span'>) => (
  <div {...mergeProps(useRatingGroup().getHiddenInputProps(), props)} />
);

export function Rating() {
  return (
    <RatingGroupProvider id={useId()}>
      <RatingGroupRoot>
        <RatingGroupLabel>Rate:</RatingGroupLabel>
        <RatingGroupControl>
          <RatingGroupConsumer>
            {(api) =>
              api.items.map((index) => {
                const state = api.getItemState({ index });
                return (
                  <RatingGroupItem key={index} index={index}>
                    {state.half ? <StarHalf /> : <Star />}
                  </RatingGroupItem>
                );
              })
            }
          </RatingGroupConsumer>
        </RatingGroupControl>
        <RatingGroupHiddenInput />
      </RatingGroupRoot>
    </RatingGroupProvider>
  );
}
