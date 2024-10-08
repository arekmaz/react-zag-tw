/* eslint-disable react-hooks/exhaustive-deps */
import * as menu from '@zag-js/menu';
import { mergeProps, normalizeProps, Portal, useMachine } from '@zag-js/react';
import { ComponentProps, useEffect, useId } from 'react';
import { createHookContext } from './machine-ctx';

export const [useMenu, MenuProvider, MenuContext] = createHookContext(
  (ctx: menu.Context) => {
    const [state, send, machine] = useMachine(menu.machine(ctx));

    const api = menu.connect(state, send, normalizeProps);

    return { api, state, send, machine };
  }
);

export const MenuConsumer = MenuContext.Consumer;

export const MenuTrigger = (props: ComponentProps<'button'>) => (
  <button {...mergeProps(useMenu().api.getTriggerProps(), props)} />
);

export const MenuIndicator = (props: ComponentProps<'span'>) => (
  <span {...mergeProps(useMenu().api.getIndicatorProps(), props)} />
);

export const MenuPositioner = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useMenu().api.getPositionerProps(), props)} />
);

export const MenuContent = (props: ComponentProps<'ul'>) => (
  <ul
    {...mergeProps(
      useMenu().api.getContentProps(),
      {
        className: [
          'border',
          'bg-background',
          'rounded-md',
          'shadow-lg',
          'flex-col',
          'outline-none',
          'w-[calc(100%+2rem)]',
          'z-dropdown',
          'data-[state=open]:flex',
          'data-[state=closed]:hidden',
          'gap-1',
          // 'py-1',
        ].join(' '),
      },
      props
    )}
  />
);

export const MenuItem = ({
  value,
  ...props
}: ComponentProps<'li'> & menu.ItemProps) => (
  <li
    {...mergeProps(
      useMenu().api.getItemProps({ value }),
      {
        className: [
          'flex',
          'items-center',
          'radius-sm',
          'cursor-pointer',
          'font-medium',
          'text-sm',
          'transition-[background,color]',
          'ease-default',
          'duration-fast',
          'hover:bg-muted',
          '_highlighted:bg-muted',
          '[&_:where(svg)]:text-muted-foreground',
          'font-semibold',
          'text-sm',
          'h-10',
          'px-2.5',
          // 'mx-1',
          '[&_:where(svg)]:size-4',
        ].join(' '),
      },
      props
    )}
  />
);

export const MenuContextTrigger = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useMenu().api.getContextTriggerProps(), props)} />
);

export function Menu() {
  return (
    <MenuProvider id={useId()}>
      <div>
        <MenuTrigger>
          Actions <MenuIndicator>▾</MenuIndicator>
        </MenuTrigger>
        <MenuPositioner>
          <MenuContent>
            <MenuItem value="edit">Edit</MenuItem>
            <MenuItem value="duplicate">Duplicate</MenuItem>
            <MenuItem value="delete">Delete</MenuItem>
            <MenuItem value="export">Export</MenuItem>
          </MenuContent>
        </MenuPositioner>
      </div>
    </MenuProvider>
  );
}

export function ContextMenu() {
  return (
    <MenuProvider id={useId()}>
      <div>
        <MenuContextTrigger>
          <div>Open context menu</div>
        </MenuContextTrigger>
        <MenuPositioner>
          <MenuContent>
            <MenuItem value="edit">Edit</MenuItem>
            <MenuItem value="duplicate">Duplicate</MenuItem>
            <MenuItem value="delete">Delete</MenuItem>
            <MenuItem value="export">Export</MenuItem>
          </MenuContent>
        </MenuPositioner>
      </div>
    </MenuProvider>
  );
}

const Mount = ({ onMount }: { onMount: () => void }) => {
  useEffect(() => {
    onMount();
  }, []);
  return null;
};

export function NestedMenu() {
  return (
    <MenuProvider id={useId()} aria-label="File">
      <MenuTrigger>Click me</MenuTrigger>

      <Portal>
        <MenuPositioner>
          <MenuContent>
            <MenuItem value="new-tab">New tab</MenuItem>
            <MenuItem value="new-win">New window</MenuItem>
            <MenuConsumer>
              {(fileMenu) => (
                <MenuProvider id="share" aria-label="Share">
                  <MenuConsumer>
                    {(shareMenu) => (
                      <>
                        <Mount
                          onMount={() => {
                            setTimeout(() => {
                              fileMenu.api.setChild(shareMenu.machine);
                              shareMenu.api.setParent(fileMenu.machine);
                            });
                          }}
                        />
                        <MenuItem
                          value="share"
                          {...fileMenu.api.getTriggerItemProps(shareMenu.api)}
                        >
                          Share
                        </MenuItem>
                        <Portal>
                          <MenuPositioner>
                            <MenuContent>
                              <MenuItem value="messages">Messages</MenuItem>
                              <MenuItem value="airdrop">Airdrop</MenuItem>
                              <MenuItem value="whatsapp">WhatsApp</MenuItem>
                            </MenuContent>
                          </MenuPositioner>
                        </Portal>
                      </>
                    )}
                  </MenuConsumer>
                </MenuProvider>
              )}
            </MenuConsumer>
            <MenuItem value="print">Print...</MenuItem>
            <MenuItem value="help">Help</MenuItem>
          </MenuContent>
        </MenuPositioner>
      </Portal>
    </MenuProvider>
  );
}
