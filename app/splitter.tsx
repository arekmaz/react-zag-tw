import * as splitter from '@zag-js/splitter';
import { useId, ComponentProps } from 'react';
import { mergeProps, normalizeProps, useMachine } from '@zag-js/react';
import { createHookContext } from './machine-ctx';

export const [useSplitter, SplitterProvider, SplitterContext] =
  createHookContext((ctx: splitter.Context) => {
    const [state, send] = useMachine(splitter.machine(ctx));

    const api = splitter.connect(state, send, normalizeProps);

    return api;
  });

export const SplitterConsumer = SplitterContext.Consumer;

export const SplitterRoot = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useSplitter().getRootProps(), props)} />
);

export const SplitterPanel = (
  props: ComponentProps<'div'> & splitter.PanelProps
) => (
  <div {...mergeProps(useSplitter().getPanelProps({ id: props.id }), props)} />
);

export const SplitterResizeTrigger = (
  props: ComponentProps<'div'> & splitter.ResizeTriggerProps
) => (
  <div
    {...mergeProps(
      useSplitter().getResizeTriggerProps({ id: props.id }),
      props
    )}
  />
);

export function Splitter() {
  return (
    <SplitterProvider
      id={useId()}
      size={[
        { id: 'a', size: 50 },
        { id: 'b', size: 50 },
      ]}
    >
      <SplitterRoot>
        <SplitterPanel id="a">
          <p>A</p>
        </SplitterPanel>
        <SplitterResizeTrigger id="a:b" />
        <SplitterPanel id="b">
          <p>B</p>
        </SplitterPanel>
      </SplitterRoot>
    </SplitterProvider>
  );
}
