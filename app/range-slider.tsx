import * as slider from '@zag-js/slider';
import { useMachine, normalizeProps, mergeProps } from '@zag-js/react';
import { useId, ComponentProps } from 'react';
import { createHookContext } from './machine-ctx';

export const [useRangeSlider, RangeSliderProvider, RangeSliderContext] =
  createHookContext((ctx: slider.Context) => {
    const [state, send] = useMachine(slider.machine(ctx));

    const api = slider.connect(state, send, normalizeProps);

    return api;
  });

export const RangeSliderConsumer = RangeSliderContext.Consumer;

export const RangeSliderRoot = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useRangeSlider().getRootProps(), props)} />
);

export const RangeSliderControl = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useRangeSlider().getControlProps(), props)} />
);

export const RangeSliderTrack = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useRangeSlider().getTrackProps(), props)} />
);

export const RangeSliderRange = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useRangeSlider().getRangeProps(), props)} />
);

export const RangeSliderThumb = ({
  index,
  ...props
}: ComponentProps<'div'> & slider.ThumbProps) => (
  <div {...mergeProps(useRangeSlider().getThumbProps({ index }), props)} />
);

export const RangeSliderHiddenInput = ({
  index,
  ...props
}: ComponentProps<'div'> & slider.ThumbProps) => (
  <div
    {...mergeProps(useRangeSlider().getHiddenInputProps({ index }), props)}
  />
);

export function RangeSlider() {
  const [state, send] = useMachine(
    slider.machine({
      id: '1',
      name: 'quantity',
      value: [10, 60],
    })
  );

  const api = slider.connect(state, send, normalizeProps);

  return (
    <RangeSliderProvider id={useId()} name="quantity" value={[10, 60]}>
      <RangeSliderRoot>
        <RangeSliderControl>
          <RangeSliderTrack>
            <RangeSliderRange />
          </RangeSliderTrack>
          {api.value.map((_, index) => (
            <RangeSliderThumb key={index} index={index}>
              <RangeSliderHiddenInput index={index} />
            </RangeSliderThumb>
          ))}
        </RangeSliderControl>
      </RangeSliderRoot>
    </RangeSliderProvider>
  );
}
