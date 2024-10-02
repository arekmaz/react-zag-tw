import * as fileUpload from '@zag-js/file-upload';
import { mergeProps, normalizeProps, useMachine } from '@zag-js/react';
import { ComponentProps, useId } from 'react';
import { createHookContext } from './machine-ctx';

export const [useFileUpload, FileUploadProvider, FileUploadContext] =
  createHookContext((ctx: fileUpload.Context) => {
    const [state, send] = useMachine(fileUpload.machine(ctx));

    const api = fileUpload.connect(state, send, normalizeProps);

    return api;
  });

export const FileUploadConsumer = FileUploadContext.Consumer;

export const FileUploadRoot = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useFileUpload().getRootProps(), props)} />
);

export const FileUploadDropzone = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useFileUpload().getDropzoneProps(), props)} />
);

export const FileUploadHiddenInput = (props: ComponentProps<'input'>) => (
  <input {...mergeProps(useFileUpload().getHiddenInputProps(), props)} />
);

export const FileUploadTrigger = (props: ComponentProps<'button'>) => (
  <button {...mergeProps(useFileUpload().getTriggerProps(), props)} />
);

export const FileUploadItemGroup = (props: ComponentProps<'ul'>) => (
  <ul {...mergeProps(useFileUpload().getItemGroupProps(), props)} />
);

export const FileUploadItem = ({
  file,
  ...props
}: ComponentProps<'li'> & fileUpload.ItemProps) => (
  <ul {...mergeProps(useFileUpload().getItemProps({ file }), props)} />
);

export const FileUploadItemName = ({
  file,
  ...props
}: ComponentProps<'div'> & fileUpload.ItemProps) => (
  <div {...mergeProps(useFileUpload().getItemNameProps({ file }), props)} />
);

export const FileUploadItemDelete = ({
  file,
  ...props
}: ComponentProps<'button'> & fileUpload.ItemProps) => (
  <button
    {...mergeProps(useFileUpload().getItemDeleteTriggerProps({ file }), props)}
  />
);

export function FileUpload() {
  return (
    <FileUploadProvider id={useId()}>
      <FileUploadRoot>
        <FileUploadDropzone>
          <FileUploadHiddenInput />
          <span>Drag your file(s) here</span>
        </FileUploadDropzone>

        <FileUploadTrigger>Choose file(s)</FileUploadTrigger>

        <FileUploadItemGroup>
          <FileUploadConsumer>
            {(api) =>
              api.acceptedFiles.map((file) => (
                <FileUploadItem key={file.name} file={file}>
                  <FileUploadItemName file={file}>
                    {file.name}
                  </FileUploadItemName>
                  <FileUploadItemDelete file={file}>
                    Delete
                  </FileUploadItemDelete>
                </FileUploadItem>
              ))
            }
          </FileUploadConsumer>
        </FileUploadItemGroup>
      </FileUploadRoot>
    </FileUploadProvider>
  );
}
