import * as steps from '@zag-js/steps';
import { useMachine, normalizeProps, mergeProps } from '@zag-js/react';
import { useId, ComponentProps } from 'react';
import { createHookContext } from './machine-ctx';

export const [useSteps, StepsProvider, StepsContext] = createHookContext(
  (ctx: steps.Context) => {
    const [state, send] = useMachine(steps.machine(ctx));

    const api = steps.connect(state, send, normalizeProps);

    return api;
  }
);

export const StepsConsumer = StepsContext.Consumer;

export const StepsRoot = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useSteps().getRootProps(), props)} />
);

export const StepsList = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useSteps().getListProps(), props)} />
);

export const StepsItem = ({
  index,
  ...props
}: ComponentProps<'div'> & steps.ItemProps) => (
  <div {...mergeProps(useSteps().getItemProps({ index }), props)} />
);

export const StepsTrigger = ({
  index,
  ...props
}: ComponentProps<'button'> & steps.ItemProps) => (
  <button {...mergeProps(useSteps().getTriggerProps({ index }), props)} />
);

export const StepsPrevTrigger = (props: ComponentProps<'button'>) => (
  <button {...mergeProps(useSteps().getPrevTriggerProps(), props)} />
);

export const StepsNextTrigger = (props: ComponentProps<'button'>) => (
  <button {...mergeProps(useSteps().getNextTriggerProps(), props)} />
);

export const StepsIndicator = ({
  index,
  ...props
}: ComponentProps<'div'> & steps.ItemProps) => (
  <div {...mergeProps(useSteps().getIndicatorProps({ index }), props)} />
);

export const StepsSeparator = ({
  index,
  ...props
}: ComponentProps<'div'> & steps.ItemProps) => (
  <div {...mergeProps(useSteps().getSeparatorProps({ index }), props)} />
);

export const StepsContent = ({
  index,
  ...props
}: ComponentProps<'div'> & steps.ItemProps) => (
  <div {...mergeProps(useSteps().getContentProps({ index }), props)} />
);

const stepsData = [
  { title: 'Step 1' },
  { title: 'Step 2' },
  { title: 'Step 3' },
];

export function Steps() {
  return (
    <StepsProvider id={useId()} count={stepsData.length}>
      <StepsRoot>
        <StepsList>
          {stepsData.map((step, index) => (
            <StepsItem key={index} index={index}>
              <StepsTrigger index={index}>
                <StepsIndicator index={index}>{index + 1}</StepsIndicator>
                <span>{step.title}</span>
              </StepsTrigger>
              <StepsSeparator index={index} />
            </StepsItem>
          ))}
        </StepsList>

        {stepsData.map((step, index) => (
          <StepsContent key={index} index={index}>
            {step.title}
          </StepsContent>
        ))}

        <StepsContent index={stepsData.length}>
          Steps Complete - Thank you for filling out the form!
        </StepsContent>

        <div>
          <StepsPrevTrigger>Back</StepsPrevTrigger>
          <StepsNextTrigger>Next</StepsNextTrigger>
        </div>
      </StepsRoot>
    </StepsProvider>
  );
}
