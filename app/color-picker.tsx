import { mergeProps, normalizeProps, useMachine } from '@zag-js/react';
import * as colorPicker from '@zag-js/color-picker';
import { createHookContext } from './machine-ctx';
import { ComponentProps, useId } from 'react';

// Create hook context for color picker
export const [useColorPicker, ColorPickerProvider, ColorPickerContext] =
  createHookContext((ctx: colorPicker.Context) => {
    const [state, send] = useMachine(colorPicker.machine(ctx));
    const api = colorPicker.connect(state, send, normalizeProps);
    return api;
  });

export const ColorPickerConsumer = ColorPickerContext.Consumer;

// ColorPicker Root Component
export const ColorPickerRoot = (props: ComponentProps<'div'>) => (
  <div
    {...mergeProps(
      useColorPicker().getRootProps(),
      {
        className: 'flex flex-col gap-2',
      },
      props
    )}
  />
);

// ColorPicker Label Component
export const ColorPickerLabel = (props: ComponentProps<'label'>) => (
  <label {...mergeProps(useColorPicker().getLabelProps(), props)}>
    Select Color: {props.children}
  </label>
);

// ColorPicker Control Component
export const ColorPickerControl = (props: ComponentProps<'div'>) => (
  <div
    {...mergeProps(useColorPicker().getControlProps(), props)}
    className="flex items-center gap-2"
  />
);

// ColorPicker Trigger Component
export const ColorPickerTrigger = (props: ComponentProps<'button'>) => (
  <button {...mergeProps(useColorPicker().getTriggerProps(), props)}>
    <div {...useColorPicker().getTransparencyGridProps({ size: '10px' })} />
    <div
      {...useColorPicker().getSwatchProps({ value: useColorPicker().value })}
    />
  </button>
);

// ColorPicker Channel Input Component
export const ColorPickerChannelInput = ({
  channel,
  ...props
}: ComponentProps<'input'> & { channel: 'hex' | 'alpha' }) => (
  <input
    {...mergeProps(useColorPicker().getChannelInputProps({ channel }), props)}
  />
);

// ColorPicker Positioner Component
export const ColorPickerPositioner = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useColorPicker().getPositionerProps(), props)} />
);

// ColorPicker Content Component
export const ColorPickerContent = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useColorPicker().getContentProps(), props)}>
    {props.children}
  </div>
);

// ColorPicker Area Component
export const ColorPickerArea = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useColorPicker().getAreaProps(), props)}>
    <div {...useColorPicker().getAreaBackgroundProps()} />
    <div {...useColorPicker().getAreaThumbProps()} />
  </div>
);

// ColorPicker Slider Component
export const ColorPickerSlider = ({
  channel,
  ...props
}: ComponentProps<'div'> & { channel: 'hue' | 'alpha' }) => (
  <div
    {...mergeProps(useColorPicker().getChannelSliderProps({ channel }), props)}
  >
    <div {...useColorPicker().getChannelSliderTrackProps({ channel })} />
    <div {...useColorPicker().getChannelSliderThumbProps({ channel })} />
  </div>
);

// Full ColorPicker Component
export function ColorPicker() {
  return (
    <ColorPickerProvider
      id={useId()}
      value={colorPicker.parse('hsl(0, 100%, 50%)')}
    >
      <ColorPickerRoot>
        <ColorPickerLabel>
          <ColorPickerConsumer>
            {(api) => (
              <>
                {api.valueAsString}
                <input {...api.getHiddenInputProps()} />
              </>
            )}
          </ColorPickerConsumer>
        </ColorPickerLabel>
        <ColorPickerControl>
          <ColorPickerTrigger />
          <ColorPickerChannelInput channel="hex" />
          <ColorPickerChannelInput channel="alpha" />
        </ColorPickerControl>
        <ColorPickerPositioner>
          <ColorPickerContent>
            <ColorPickerArea />
            <ColorPickerSlider channel="hue" />
            <ColorPickerSlider channel="alpha" />
          </ColorPickerContent>
        </ColorPickerPositioner>
      </ColorPickerRoot>
    </ColorPickerProvider>
  );
}
