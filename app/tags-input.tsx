import { mergeProps, normalizeProps, useMachine } from '@zag-js/react';
import * as tagsInput from '@zag-js/tags-input';
import { ComponentProps, useId } from 'react';
import { createHookContext } from './machine-ctx';

export const [useTagsInput, TagsInputProvider, TagsInputContext] =
  createHookContext((ctx: tagsInput.Context) => {
    const [state, send] = useMachine(tagsInput.machine(ctx));

    const api = tagsInput.connect(state, send, normalizeProps);

    return api;
  });

export const TagsInputConsumer = TagsInputContext.Consumer;

export const TagsInputRoot = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useTagsInput().getRootProps(), props)} />
);

export const TagsInputItem = ({
  index,
  value,
  ...props
}: ComponentProps<'span'> & tagsInput.ItemProps) => (
  <span {...mergeProps(useTagsInput().getItemProps({ index, value }), props)} />
);

export const TagsInputItemPreview = ({
  index,
  value,
  ...props
}: ComponentProps<'div'> & tagsInput.ItemProps) => (
  <div
    {...mergeProps(useTagsInput().getItemPreviewProps({ index, value }), props)}
  />
);

export const TagsInputItemDeleteTrigger = ({
  index,
  value,
  ...props
}: ComponentProps<'button'> & tagsInput.ItemProps) => (
  <button
    {...mergeProps(
      useTagsInput().getItemDeleteTriggerProps({ index, value }),
      props
    )}
  />
);

export const TagsInputItemInput = ({
  index,
  value,
  ...props
}: ComponentProps<'input'> & tagsInput.ItemProps) => (
  <input
    {...mergeProps(useTagsInput().getItemInputProps({ index, value }), props)}
  />
);

export const TagsInputInput = (props: ComponentProps<'input'>) => (
  <input {...mergeProps(useTagsInput().getInputProps(), props)} />
);

export function TagsInput() {
  return (
    <TagsInputProvider id={useId()} value={['React', 'Vue']}>
      <TagsInputRoot>
        <TagsInputConsumer>
          {(api) =>
            api.value.map((value, index) => (
              <TagsInputItem key={index} index={index} value={value}>
                <TagsInputItemPreview index={index} value={value}>
                  <span>{value} </span>
                  <TagsInputItemDeleteTrigger index={index} value={value}>
                    &#x2715;
                  </TagsInputItemDeleteTrigger>
                </TagsInputItemPreview>
                <TagsInputItemInput index={index} value={value} />
              </TagsInputItem>
            ))
          }
        </TagsInputConsumer>
        <TagsInputInput placeholder="Add tag..." />
      </TagsInputRoot>
    </TagsInputProvider>
  );
}
