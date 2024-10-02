import { mergeProps, normalizeProps, useMachine } from '@zag-js/react';
import * as accordion from '@zag-js/accordion';
import { createHookContext } from './machine-ctx';
import { ComponentProps } from 'react';

const data = [
  { title: 'Watercraft', content: 'Sample accordion content' },
  { title: 'Automobiles', content: 'Sample accordion content' },
  { title: 'Aircrafts', content: 'Sample accordion content' },
];

export const [useAccordion, AccordionProvider, AccordionContext] =
  createHookContext((ctx: accordion.Context) => {
    const [state, send] = useMachine(accordion.machine(ctx));

    const api = accordion.connect(state, send, normalizeProps);

    return api;
  });

export const AccordionConsumer = AccordionContext.Consumer;

export const AccordionRoot = (props: ComponentProps<'div'>) => (
  <div
    {...mergeProps(
      useAccordion().getRootProps(),
      {
        className: '',
      },
      props
    )}
  />
);

export const AccordionItem = ({
  value,
  ...props
}: ComponentProps<'div'> & { value: string }) => (
  <div
    {...mergeProps(
      useAccordion().getItemProps({ value }),
      {
        className: '',
      },
      props
    )}
  />
);

export const AccordionTrigger = ({
  value,
  ...props
}: ComponentProps<'button'> & { value: string }) => (
  <button
    {...mergeProps(
      useAccordion().getItemTriggerProps({ value }),
      {
        className: '',
      },
      props
    )}
  />
);

export const AccordionContent = ({
  value,
  ...props
}: ComponentProps<'div'> & { value: string }) => (
  <div
    {...mergeProps(
      useAccordion().getItemContentProps({ value }),
      {
        className: '',
      },
      props
    )}
  />
);

export function AccordionMachine() {
  return (
    <AccordionProvider id="1">
      <AccordionRoot>
        {data.map((item) => (
          <AccordionItem key={item.title} value={item.title}>
            <h3>
              <AccordionTrigger value={item.title}>
                {item.title}
              </AccordionTrigger>
            </h3>
            <AccordionContent value={item.title}>
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </AccordionRoot>
    </AccordionProvider>
  );
}
