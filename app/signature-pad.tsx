/* eslint-disable jsx-a11y/label-has-associated-control */
import { mergeProps, normalizeProps, useMachine } from '@zag-js/react';
import * as signaturePad from '@zag-js/signature-pad';
import { ComponentProps, useId } from 'react';
import { createHookContext } from './machine-ctx';

export const [useSignaturePad, SignaturePadProvider, SignaturePadContext] =
  createHookContext((ctx: signaturePad.Context) => {
    const [state, send] = useMachine(signaturePad.machine(ctx));

    const api = signaturePad.connect(state, send, normalizeProps);

    return api;
  });

export const SignaturePadConsumer = SignaturePadContext.Consumer;

export const SignaturePadRoot = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useSignaturePad().getRootProps(), props)} />
);

export const SignaturePadLabel = (props: ComponentProps<'label'>) => (
  <label {...mergeProps(useSignaturePad().getLabelProps(), props)} />
);

export const SignaturePadControl = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useSignaturePad().getControlProps(), props)} />
);

export const SignaturePadSegment = (props: ComponentProps<'svg'>) => (
  <svg {...mergeProps(useSignaturePad().getSegmentProps(), props)} />
);

export const SignaturePadSegmentPath = ({
  path,
  ...props
}: ComponentProps<'path'> & signaturePad.SegmentPathProps) => (
  <path
    {...mergeProps(useSignaturePad().getSegmentPathProps({ path }), props)}
  />
);

export const SignaturePadClearTrigger = (props: ComponentProps<'button'>) => (
  <button {...mergeProps(useSignaturePad().getClearTriggerProps(), props)} />
);

export const SignaturePadGuide = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useSignaturePad().getGuideProps(), props)} />
);

export function SignaturePad() {
  return (
    <SignaturePadProvider id={useId()}>
      <SignaturePadRoot>
        <SignaturePadLabel>Signature Pad</SignaturePadLabel>

        <SignaturePadControl>
          <SignaturePadSegment>
            <SignaturePadConsumer>
              {(api) => (
                <>
                  {api.paths.map((path, i) => (
                    <SignaturePadSegmentPath key={i} path={path} />
                  ))}
                  {api.currentPath && (
                    <SignaturePadSegmentPath path={api.currentPath} />
                  )}
                </>
              )}
            </SignaturePadConsumer>
          </SignaturePadSegment>

          <SignaturePadClearTrigger>X</SignaturePadClearTrigger>

          <SignaturePadGuide />
        </SignaturePadControl>
      </SignaturePadRoot>
    </SignaturePadProvider>
  );
}
