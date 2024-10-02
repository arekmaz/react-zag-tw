import * as tour from '@zag-js/tour';
import { useMachine, normalizeProps, Portal, mergeProps } from '@zag-js/react';
import { useId, ComponentProps } from 'react';
import { createHookContext } from './machine-ctx';

export const [useTour, TourProvider, TourContext] = createHookContext(
  (ctx: tour.Context) => {
    const [state, send] = useMachine(tour.machine(ctx));

    const api = tour.connect(state, send, normalizeProps);

    return api;
  }
);

export const TourConsumer = TourContext.Consumer;

export const TourBackdrop = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useTour().getBackdropProps(), props)} />
);

export const TourSpotlight = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useTour().getSpotlightProps(), props)} />
);

export const TourPositioner = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useTour().getPositionerProps(), props)} />
);

export const TourContent = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useTour().getContentProps(), props)} />
);

export const TourArrow = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useTour().getArrowProps(), props)} />
);

export const TourArrowTip = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useTour().getArrowTipProps(), props)} />
);

export function Tour() {
  return (
    <TourProvider id={useId()} steps={steps}>
      <TourConsumer>
        {(api) => (
          <div>
            <div>
              <button onClick={() => api.start()}>Start Tour</button>
              <div id="step-1">Step 1</div>
            </div>
            {api.step && api.open && (
              <Portal>
                {api.step.backdrop && <TourBackdrop />}
                <TourSpotlight />
                <TourPositioner>
                  <TourContent>
                    {api.step.arrow && (
                      <TourArrow>
                        <TourArrowTip />
                      </TourArrow>
                    )}

                    <p {...api.getTitleProps()}>{api.step.title}</p>
                    <div {...api.getDescriptionProps()}>
                      {api.step.description}
                    </div>
                    <div {...api.getProgressTextProps()}>
                      {api.getProgressText()}
                    </div>

                    {api.step.actions && (
                      <div>
                        {api.step.actions.map((action) => (
                          <button
                            key={action.label}
                            {...api.getActionTriggerProps({ action })}
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}

                    <button {...api.getCloseTriggerProps()}>X</button>
                  </div>
                </div>
              </Portal>
            )}
          </div>
        )}
      </TourConsumer>
    </TourProvider>
  );
}

const steps: tour.StepDetails[] = [
  {
    type: 'dialog',
    id: 'start',
    title: 'Ready to go for a ride',
    description: "Let's take the tour component for a ride and have some fun!",
    actions: [{ label: "Let's go!", action: 'next' }],
  },
  {
    id: 'logic',
    title: 'Step 1',
    description: 'This is the first step',
    target: () => document.querySelector('#step-1'),
    placement: 'bottom',
    actions: [
      { label: 'Prev', action: 'prev' },
      { label: 'Next', action: 'next' },
    ],
  },
  {
    type: 'dialog',
    id: 'end',
    title: 'Amazing! You got to the end',
    description: 'Like what you see? Now go ahead and use it in your project.',
    actions: [{ label: 'Finish', action: 'dismiss' }],
  },
];
