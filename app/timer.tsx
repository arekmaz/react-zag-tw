/* eslint-disable jsx-a11y/label-has-associated-control */
import { mergeProps, normalizeProps, useMachine } from '@zag-js/react';
import * as timer from '@zag-js/timer';
import { ComponentProps, useId } from 'react';
import { createHookContext } from './machine-ctx.tsx';

export const [useTimer, TimerProvider, TimerContext] = createHookContext(
  (ctx: timer.Context) => {
    const [state, send] = useMachine(timer.machine(ctx));
    const api = timer.connect(state, send, normalizeProps);
    return api;
  }
);

export const TimerConsumer = TimerContext.Consumer;

export const TimerRoot = (props: ComponentProps<'div'>) => (
  <div
    {...mergeProps(
      useTimer().getRootProps(),
      {
        className: '',
      },
      props
    )}
  />
);

export const TimerArea = (props: ComponentProps<'div'>) => (
  <div
    {...mergeProps(
      useTimer().getAreaProps(),
      {
        className: '',
      },
      props
    )}
  />
);

export const TimerItem = ({
  type,
  ...props
}: ComponentProps<'div'> & timer.ItemProps) => (
  <div
    {...mergeProps(
      useTimer().getItemProps({ type }),
      {
        className: '',
      },
      props
    )}
  />
);

export const TimerSeparator = (props: ComponentProps<'div'>) => (
  <div
    {...mergeProps(
      useTimer().getSeparatorProps(),
      {
        className: '',
      },
      props
    )}
  />
);

export const TimerControl = (props: ComponentProps<'div'>) => (
  <div
    {...mergeProps(
      useTimer().getControlProps(),
      {
        className: '',
      },
      props
    )}
  />
);

export const TimerActionTrigger = ({
  action,
  ...props
}: ComponentProps<'button'> & timer.ActionTriggerProps) => (
  <button
    {...mergeProps(
      useTimer().getActionTriggerProps({ action }),
      {
        className: '',
      },
      props
    )}
  />
);

export function Timer() {
  const [state, send] = useMachine(
    timer.machine({
      id: useId(),
      countdown: true,
      autoStart: true,
      startMs: timer.parse({ days: 2, seconds: 10 }),
    })
  );

  const api = timer.connect(state, send, normalizeProps);

  return (
    <TimerProvider
      id={useId()}
      countdown
      autoStart
      startMs={timer.parse({ days: 2, seconds: 10 })}
    >
      <TimerRoot>
        <TimerArea>
          <TimerItem type="days">
            <TimerConsumer>{(api) => api.formattedTime.days}</TimerConsumer>
          </TimerItem>
          <TimerSeparator>:</TimerSeparator>
          <TimerItem type="hours">{api.formattedTime.hours}</TimerItem>
          <TimerSeparator>:</TimerSeparator>
          <TimerItem type="minutes">
            <TimerConsumer>{(api) => api.formattedTime.minutes}</TimerConsumer>
          </TimerItem>
          <TimerSeparator>:</TimerSeparator>
          <TimerItem type="seconds">
            <TimerConsumer>{(api) => api.formattedTime.seconds}</TimerConsumer>
          </TimerItem>
        </TimerArea>
        <TimerControl>
          <TimerActionTrigger action="start">START</TimerActionTrigger>
          <TimerActionTrigger action="pause">PAUSE</TimerActionTrigger>
          <TimerActionTrigger action="resume">RESUME</TimerActionTrigger>
          <TimerActionTrigger action="reset">RESET</TimerActionTrigger>
        </TimerControl>
      </TimerRoot>
    </TimerProvider>
  );
}
