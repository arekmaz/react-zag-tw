/* eslint-disable jsx-a11y/label-has-associated-control */
import * as slider from '@zag-js/slider';
import { useMachine, normalizeProps, mergeProps } from '@zag-js/react';
import { useId, ComponentProps } from 'react';
import { createHookContext } from './machine-ctx';

export const [useSlider, SliderProvider, SliderContext] = createHookContext(
  (ctx: slider.Context) => {
    const [state, send] = useMachine(slider.machine(ctx));

    const api = slider.connect(state, send, normalizeProps);

    return api;
  }
);

export const SliderConsumer = SliderContext.Consumer;

export const SliderRoot = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useSlider().getRootProps(), props)} />
);

export const SliderControl = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useSlider().getControlProps(), props)} />
);

export const SliderTrack = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useSlider().getTrackProps(), props)} />
);

export const SliderRange = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useSlider().getRangeProps(), props)} />
);

export const SliderThumb = ({
  index,
  ...props
}: ComponentProps<'div'> & slider.ThumbProps) => (
  <div {...mergeProps(useSlider().getThumbProps({ index }), props)} />
);

export const SliderHiddenInput = ({
  index,
  ...props
}: ComponentProps<'div'> & slider.ThumbProps) => (
  <div {...mergeProps(useSlider().getHiddenInputProps({ index }), props)} />
);

export const SliderLabel = (props: ComponentProps<'label'>) => (
  <label {...mergeProps(useSlider().getLabelProps(), props)} />
);

export const SliderValueText = (props: ComponentProps<'output'>) => (
  <output {...mergeProps(useSlider().getValueTextProps(), props)} />
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
    <SliderProvider id={useId()} name="quantity" value={[10, 60]}>
      <SliderRoot>
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          {api.value.map((_, index) => (
            <SliderThumb key={index} index={index}>
              <SliderHiddenInput index={index} />
            </SliderThumb>
          ))}
        </SliderControl>
      </SliderRoot>
    </SliderProvider>
  );
}

export function Slider() {
  return (
    <SliderProvider id={useId()} name="quantity" value={[10, 60]}>
      <SliderRoot>
        <div>
          <SliderLabel>Slider Label</SliderLabel>
          <SliderConsumer>
            {(api) => <SliderValueText>{api.value.at(0)}</SliderValueText>}
          </SliderConsumer>
        </div>
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderConsumer>
            {(api) =>
              api.value.map((_, index) => (
                <SliderThumb key={index} index={index}>
                  <SliderHiddenInput index={index} />
                </SliderThumb>
              ))
            }
          </SliderConsumer>
        </SliderControl>
      </SliderRoot>
    </SliderProvider>
  );
}
