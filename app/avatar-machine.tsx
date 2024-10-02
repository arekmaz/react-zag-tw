import { mergeProps, normalizeProps, useMachine } from '@zag-js/react';
import * as avatar from '@zag-js/avatar';
import { createHookContext } from './machine-ctx';
import { ComponentProps } from 'react';

export const [useAvatar, AvatarProvider, AvatarContext] = createHookContext(
  (ctx: avatar.Context) => {
    const [state, send] = useMachine(avatar.machine(ctx));

    const api = avatar.connect(state, send, normalizeProps);

    return api;
  }
);

export const AvatarConsumer = AvatarContext.Consumer;

export const AvatarRoot = (props: ComponentProps<'div'>) => (
  <div
    {...mergeProps(
      useAvatar().getRootProps(),
      {
        className: '',
      },
      props
    )}
  />
);

export const AvatarFallback = (props: ComponentProps<'span'>) => (
  <span
    {...mergeProps(
      useAvatar().getFallbackProps(),
      {
        className: '',
      },
      props
    )}
  />
);

export const AvatarImage = (props: ComponentProps<'img'>) => (
  <img
    {...mergeProps(
      useAvatar().getImageProps(),
      {
        className: '',
        alt: 'Avatar',
      },
      props
    )}
  />
);

export function AvatarMachine({ src }: { src: string }) {
  return (
    <AvatarProvider id="1">
      <AvatarRoot>
        <AvatarFallback>PA</AvatarFallback>
        <AvatarImage src={src} />
      </AvatarRoot>
    </AvatarProvider>
  );
}
