/* eslint-disable jsx-a11y/heading-has-content */
import * as dialog from '@zag-js/dialog';
import { useMachine, normalizeProps, Portal, mergeProps } from '@zag-js/react';
import { createHookContext } from './machine-ctx';
import { ComponentProps, useId } from 'react';

export const [useDialog, DialogProvider, DialogContext] = createHookContext(
  (ctx: dialog.Context) => {
    const [state, send] = useMachine(dialog.machine(ctx));

    const api = dialog.connect(state, send, normalizeProps);

    return api;
  }
);

export const DialogConsumer = DialogContext.Consumer;

export const DialogTrigger = (props: ComponentProps<'button'>) => (
  <button {...mergeProps(useDialog().getTriggerProps(), props)} />
);

export const DialogBackdrop = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useDialog().getBackdropProps(), props)} />
);

export const DialogPositioner = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useDialog().getPositionerProps(), props)} />
);

export const DialogContent = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useDialog().getContentProps(), props)} />
);

export const DialogTitle = (props: ComponentProps<'h2'>) => (
  <h2 {...mergeProps(useDialog().getTitleProps(), props)} />
);

export const DialogDescription = (props: ComponentProps<'p'>) => (
  <p {...mergeProps(useDialog().getDescriptionProps(), props)} />
);

export const DialogCloseTrigger = (props: ComponentProps<'button'>) => (
  <button {...mergeProps(useDialog().getCloseTriggerProps(), props)} />
);

export function Dialog() {
  return (
    <DialogProvider id={useId()}>
      <DialogTrigger>Open Dialog</DialogTrigger>
      <DialogConsumer>
        {(api) =>
          api.open && (
            <Portal>
              <DialogBackdrop />
              <DialogPositioner>
                <DialogContent>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you are
                    done.
                  </DialogDescription>
                  <div>
                    <input placeholder="Enter name..." />
                    <button>Save</button>
                  </div>
                  <DialogCloseTrigger>Close</DialogCloseTrigger>
                </DialogContent>
              </DialogPositioner>
            </Portal>
          )
        }
      </DialogConsumer>
    </DialogProvider>
  );
}
