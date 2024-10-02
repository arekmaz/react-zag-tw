import { mergeProps, normalizeProps, useMachine } from '@zag-js/react';
import * as carousel from '@zag-js/carousel';
import { createHookContext } from './machine-ctx';
import { ComponentProps } from 'react';

const items = [
  'https://tinyurl.com/5b6ka8jd',
  'https://tinyurl.com/7rmccdn5',
  'https://tinyurl.com/59jxz9uu',
];

export const [useCarousel, CarouselProvider, CarouselContext] =
  createHookContext((ctx: carousel.Context) => {
    const [state, send] = useMachine(carousel.machine(ctx));
    const api = carousel.connect(state, send, normalizeProps);
    return api;
  });

export const CarouselConsumer = CarouselContext.Consumer;

export const CarouselRoot = (props: ComponentProps<'div'>) => (
  <div
    {...mergeProps(
      useCarousel().getRootProps(),
      {
        className: '',
      },
      props
    )}
  />
);

export const CarouselViewport = (props: ComponentProps<'div'>) => (
  <div
    {...mergeProps(
      useCarousel().getViewportProps(),
      {
        className: 'overflow-hidden',
      },
      props
    )}
  />
);

export const CarouselItemGroup = (props: ComponentProps<'div'>) => (
  <div
    {...mergeProps(
      useCarousel().getItemGroupProps(),
      {
        className: 'flex',
      },
      props
    )}
  />
);

export const CarouselItem = ({
  index,
  ...props
}: ComponentProps<'div'> & { index: number }) => (
  <div
    {...mergeProps(
      useCarousel().getItemProps({ index }),
      {
        className: '',
      },
      props
    )}
  />
);

export const CarouselImage = ({
  src,
  ...props
}: ComponentProps<'img'> & { src: string }) => (
  <img
    src={src}
    alt=""
    style={{ height: '300px', width: '100%', objectFit: 'cover' }}
    {...props}
  />
);

export const CarouselPrevButton = (props: ComponentProps<'button'>) => (
  <button
    {...mergeProps(
      useCarousel().getPrevTriggerProps(),
      {
        className: '',
      },
      props
    )}
  >
    Prev
  </button>
);

export const CarouselNextButton = (props: ComponentProps<'button'>) => (
  <button
    {...mergeProps(
      useCarousel().getNextTriggerProps(),
      {
        className: '',
      },
      props
    )}
  >
    Next
  </button>
);

export function CarouselMachine() {
  return (
    <CarouselProvider id="1">
      <CarouselRoot>
        <CarouselPrevButton>Prev</CarouselPrevButton>
        <CarouselNextButton>Next</CarouselNextButton>
        <CarouselViewport>
          <CarouselItemGroup>
            {items.map((image, index) => (
              <CarouselItem key={index} index={index}>
                <CarouselImage src={image} />
              </CarouselItem>
            ))}
          </CarouselItemGroup>
        </CarouselViewport>
      </CarouselRoot>
    </CarouselProvider>
  );
}
