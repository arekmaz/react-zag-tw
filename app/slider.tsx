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
  <div
    {...mergeProps(
      useSlider().getRootProps(),
      {
        className: ['flex', 'flex-col', 'gap-1', 'w-full'].join(' '),
      },
      props
    )}
  />
);

export const SliderControl = (props: ComponentProps<'div'>) => (
  <div
    {...mergeProps(
      useSlider().getControlProps(),
      {
        className: [
          'relative',
          'flex',
          'items-center',
          'cursor-pointer',
          'data-[focus]:ring-2',
          'data-[focus]:ring-ring',
          'data-[focus]:ring-offset-2',
          'data-[focus]:rounded-sm',
          'h-5',
        ].join(' '),
      },
      props
    )}
  />
);

export const SliderTrack = (props: ComponentProps<'div'>) => (
  <div
    {...mergeProps(
      useSlider().getTrackProps(),
      {
        className: [
          'bg-input',
          'rounded-full',
          'overflow-hidden',
          'flex-1',
          'h-2',
        ].join(' '),
      },
      props
    )}
  />
);

export const SliderRange = (props: ComponentProps<'div'>) => (
  <div
    {...mergeProps(
      useSlider().getRangeProps(),
      { className: ['bg-foreground', 'h-2'].join(' ') },
      props
    )}
  />
);

export const SliderMarkerGroup = (props: ComponentProps<'div'>) => (
  <div
    {...mergeProps(
      useSlider().getMarkerGroupProps(),
      {
        className: [
          'absolute',
          'text-sm',
          'before:h-1',
          'before:-top-3',
          'before:w-1',
        ].join(' '),
      },
      props
    )}
  />
);

export const SliderMarker = ({
  value,
  ...props
}: ComponentProps<'div'> & slider.MarkerProps) => (
  <div
    {...mergeProps(
      useSlider().getMarkerProps({ value }),
      {
        className: [
          '[--before-background:hsl(var(--foreground))]',
          'text-sm',
          'text-muted-foreground',
          'before:bg-background',
          'before:rounded-full',
          'before:content-[""]',
          'before:block',
          'before:left-1/2',
          'before:relative',
          'before:-translate-x-1/2',
          'before:h-1',
          'before:-top-3',
          'before:w-1',
        ].join(' '),
      },
      props
    )}
  />
);

export const SliderThumb = ({
  index,
  ...props
}: ComponentProps<'div'> & slider.ThumbProps) => (
  <div
    {...mergeProps(
      useSlider().getThumbProps({ index }),
      {
        className: [
          'bg-background',
          'border-2',
          'border-foreground',
          'rounded-full',
          'outline-none',
          'shadow-sm',
          'z-[1]',
          'data-[focus]:ring-2',
          'data-[focus]:border-ring',
          'data-[focus]:ring-foreground',
          'size-5',
        ].join(' '),
      },
      props
    )}
  />
);

export const SliderHiddenInput = ({
  index,
  ...props
}: ComponentProps<'div'> & slider.ThumbProps) => (
  <div
    {...mergeProps(
      useSlider().getHiddenInputProps({ index }),
      { className: '' },
      props
    )}
  />
);

export const SliderLabel = (props: ComponentProps<'label'>) => (
  <label
    {...mergeProps(
      useSlider().getLabelProps(),
      { className: 'font-medium text-sm' },
      props
    )}
  />
);

export const SliderValueText = (props: ComponentProps<'output'>) => (
  <output
    {...mergeProps(useSlider().getValueTextProps(), { className: '' }, props)}
  />
);

export function RangeSlider() {
  return (
    <SliderProvider id={useId()} name="quantity" value={[10, 60]}>
      <SliderRoot className="min-w-[200px]">
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
        <SliderMarkerGroup>
          <SliderMarker value={25}>25</SliderMarker>
          <SliderMarker value={50}>50</SliderMarker>
          <SliderMarker value={75}>75</SliderMarker>
        </SliderMarkerGroup>
      </SliderRoot>
    </SliderProvider>
  );
}

export function Slider() {
  return (
    <SliderProvider id={useId()} name="quantity" value={[10, 60]}>
      <SliderRoot className="min-w-[200px]">
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
        <SliderMarkerGroup>
          <SliderMarker value={25}>25</SliderMarker>
          <SliderMarker value={50}>50</SliderMarker>
          <SliderMarker value={75}>75</SliderMarker>
        </SliderMarkerGroup>
      </SliderRoot>
    </SliderProvider>
  );
}
