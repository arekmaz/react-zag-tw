import * as Zag from '@zag-js/react';
import * as accordion from '@zag-js/accordion';
import * as React from 'react';
import { ChevronDown } from 'lucide-react';

const AccordionContext = React.createContext<accordion.Api | null>(null);

function useAccordion() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error('useAccordion must be used within a AccordionProvider.');
  }

  return context;
}

export const AccordionProvider = ({
  children,
  ...ctx
}: React.PropsWithChildren<accordion.Context>) => {
  const [state, send] = Zag.useMachine(accordion.machine(ctx));

  const api = accordion.connect(state, send, Zag.normalizeProps);

  return (
    <AccordionContext.Provider value={api}>
      {children}
    </AccordionContext.Provider>
  );
};

export const AccordionConsumer = AccordionContext.Consumer;

export const AccordionRoot = (props: React.ComponentProps<'div'>) => (
  <div
    {...Zag.mergeProps(
      useAccordion().getRootProps(),
      {
        className: ``
      },
      props
    )}
  />
);

export const AccordionItem = ({
  value,
  ...props
}: React.ComponentProps<'div'> & { value: string }) => (
  <div
    {...Zag.mergeProps(
      useAccordion().getItemProps({ value }),
      {
        className: `
          border-b
        `
      },
      props
    )}
  />
);

export const AccordionTrigger = ({
  value,
  ...props
}: React.ComponentProps<'button'> & { value: string }) => (
  <button
    {...Zag.mergeProps(
      useAccordion().getItemTriggerProps({ value }),
      {
        className: `
          w-full
          flex
          flex-1
          items-center
          justify-between
          py-4
          font-medium
          transition-all
          hover:underline
          [&[data-state=open]>svg]:rotate-180
        `
      },
      props
    )}
  />
);

export const AccordionContent = ({
  value,
  ...props
}: React.ComponentProps<'div'> & { value: string }) => (
  <div
    {...Zag.mergeProps(
      useAccordion().getItemContentProps({ value }),
      {
        className: `
          transition-all
          grid
          duration-normal
          ease-default
          grid-rows-[0fr]
          data-[state=open]:grid-rows-[1fr]
          data-[state=open]:pb-4
        `
      },
      props
    )}
  />
);

