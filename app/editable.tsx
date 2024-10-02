import * as editable from '@zag-js/editable';
import { useMachine, normalizeProps, mergeProps } from '@zag-js/react';
import { createHookContext } from './machine-ctx';
import { ComponentProps, useId } from 'react';

export const [useEditable, EditableProvider, EditableContext] =
  createHookContext((ctx: editable.Context) => {
    const [state, send] = useMachine(editable.machine(ctx));

    const api = editable.connect(state, send, normalizeProps);

    return api;
  });

export const EditableConsumer = EditableContext.Consumer;

export const EditableRoot = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useEditable().getRootProps(), props)} />
);

export const EditableArea = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useEditable().getAreaProps(), props)} />
);

export const EditableInput = (props: ComponentProps<'input'>) => (
  <input {...mergeProps(useEditable().getInputProps(), props)} />
);

export const EditablePreview = (props: ComponentProps<'span'>) => (
  <span {...mergeProps(useEditable().getPreviewProps(), props)} />
);

export function Editable() {
  return (
    <EditableProvider id={useId()}>
      <EditableRoot>
        <EditableArea>
          <EditableInput />
          <EditablePreview />
        </EditableArea>
      </EditableRoot>
    </EditableProvider>
  );
}
