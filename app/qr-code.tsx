import * as qrCode from '@zag-js/qr-code';
import { useMachine, normalizeProps, mergeProps } from '@zag-js/react';
import { useId, ComponentProps } from 'react';
import { createHookContext } from './machine-ctx';

export const [useQrCode, QrCodeProvider, QrCodeContext] = createHookContext(
  (ctx: qrCode.Context) => {
    const [state, send] = useMachine(qrCode.machine(ctx));

    const api = qrCode.connect(state, send, normalizeProps);

    return api;
  }
);

export const QrCodeConsumer = QrCodeContext.Consumer;

export const QrCodeRoot = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useQrCode().getRootProps(), props)} />
);

export const QrCodeFrame = (props: ComponentProps<'svg'>) => (
  <svg {...mergeProps(useQrCode().getFrameProps(), props)} />
);

export const QrCodePattern = (props: ComponentProps<'path'>) => (
  <path {...mergeProps(useQrCode().getPatternProps(), props)} />
);

export const QrCodeOverlay = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useQrCode().getOverlayProps(), props)} />
);

export function QRCode() {
  return (
    <QrCodeProvider id={useId()} value="https://github.com/chakra-ui">
      <QrCodeRoot>
        <QrCodeFrame>
          <QrCodePattern />
        </QrCodeFrame>
        <QrCodeOverlay>
          <img
            src="https://avatars.githubusercontent.com/u/54212428?s=88&v=4"
            alt=""
          />
        </QrCodeOverlay>
      </QrCodeRoot>
    </QrCodeProvider>
  );
}
