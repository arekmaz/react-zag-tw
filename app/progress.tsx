import * as progress from '@zag-js/progress';
import { mergeProps, normalizeProps, useMachine } from '@zag-js/react';
import { ComponentProps, useId } from 'react';
import { createHookContext } from './machine-ctx';

export const [useProgress, ProgressProvider, ProgressContext] =
  createHookContext((ctx: progress.Context) => {
    const [state, send] = useMachine(progress.machine(ctx));

    const api = progress.connect(state, send, normalizeProps);

    return api;
  });

export const ProgressConsumer = ProgressContext.Consumer;

export const ProgressRoot = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useProgress().getRootProps(), props)} />
);

export const ProgressLabel = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useProgress().getLabelProps(), props)} />
);

export const ProgressTrack = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useProgress().getTrackProps(), props)} />
);

export const ProgressRange = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useProgress().getRangeProps(), props)} />
);

export const ProgressCircle = (props: ComponentProps<'svg'>) => (
  <svg {...mergeProps(useProgress().getCircleProps(), props)} />
);

export const ProgressCircleTrack = (props: ComponentProps<'circle'>) => (
  <circle {...mergeProps(useProgress().getCircleTrackProps(), props)} />
);

export const ProgressCircleRange = (props: ComponentProps<'circle'>) => (
  <circle {...mergeProps(useProgress().getCircleRangeProps(), props)} />
);

export function ProgressLinear() {
  return (
    <ProgressProvider id={useId()}>
      <ProgressRoot>
        <ProgressLabel>Upload progress</ProgressLabel>
        <ProgressTrack>
          <ProgressRange />
        </ProgressTrack>
      </ProgressRoot>
    </ProgressProvider>
  );
}

export function ProgressCircular() {
  return (
    <ProgressProvider id={useId()}>
      <ProgressRoot>
        <ProgressLabel>Upload progress</ProgressLabel>
        <ProgressCircle>
          <ProgressCircleTrack />
          <ProgressCircleRange />
        </ProgressCircle>
      </ProgressRoot>
    </ProgressProvider>
  );
}
