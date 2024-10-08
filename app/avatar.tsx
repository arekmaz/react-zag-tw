/* eslint-disable jsx-a11y/alt-text */
import { mergeProps, normalizeProps, useMachine } from '@zag-js/react';
import * as avatar from '@zag-js/avatar';
import { createHookContext } from './machine-ctx.tsx';
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
        className: [
          'size-12',
          'rounded-full',
          'border',
          'shrink-0',
          'overflow-hidden',
        ].join(' '),
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
        className: [
          'flex',
          'items-center',
          'justify-center',
          'bg-muted-foreground',
          'font-semibold',
          'h-[inherit]',
          'data-[state=hidden]:hidden',
        ].join(' '),
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
        className: 'object-cover',
        alt: 'Avatar',
      },
      props
    )}
  />
);

export function Avatar({ src }: { src: string }) {
  return (
    <AvatarProvider id="1">
      <AvatarRoot>
        <AvatarFallback>PA</AvatarFallback>
        <AvatarImage src={src} />
      </AvatarRoot>
    </AvatarProvider>
  );
}
