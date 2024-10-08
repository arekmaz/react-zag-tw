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
        className: ['border-b', 'data-[state=open]:border-stone-500'].join(' '),
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
        className: [
          'w-full',
          'flex',
          'flex-1',
          'items-center',
          'justify-between',
          'py-4',
          'font-medium',
          'transition-all',
          'hover:underline',
          '_disabled:text-muted-foreground',
          '_disabled:text-muted-foreground',
          '_disabled:cursor-not-allowed',
          '_disabled:hover:no-underline',
        ].join(' '),
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
        className: [
          'transition-all',
          'grid',
          'duration-normal',
          'ease-default',
          'grid-rows-[0fr]',
          'data-[state=open]:grid-rows-[1fr]',
          'data-[state=open]:pb-4',
        ].join(' '),
      },
      props
    )}
  />
);

export function Accordion() {
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
              <div className="overflow-hidden">{item.content}</div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </AccordionRoot>
    </AccordionProvider>
  );
}
