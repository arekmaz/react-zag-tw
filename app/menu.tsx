import * as menu from '@zag-js/menu';
import { mergeProps, normalizeProps, useMachine } from '@zag-js/react';
import { ComponentProps, useId } from 'react';
import { createHookContext } from './machine-ctx';

export const [useMenu, MenuProvider, MenuContext] = createHookContext(
  (ctx: menu.Context) => {
    const [state, send] = useMachine(menu.machine(ctx));

    const api = menu.connect(state, send, normalizeProps);

    return api;
  }
);

export const MenuConsumer = MenuContext.Consumer;

export const MenuTrigger = (props: ComponentProps<'button'>) => (
  <button {...mergeProps(useMenu().getTriggerProps(), props)} />
);

export const MenuIndicator = (props: ComponentProps<'span'>) => (
  <span {...mergeProps(useMenu().getIndicatorProps(), props)} />
);

export const MenuPositioner = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useMenu().getPositionerProps(), props)} />
);

export const MenuContent = (props: ComponentProps<'ul'>) => (
  <ul {...mergeProps(useMenu().getContentProps(), props)} />
);

export const MenuItem = ({
  value,
  ...props
}: ComponentProps<'li'> & menu.ItemProps) => (
  <li {...mergeProps(useMenu().getItemProps({ value }), props)} />
);

export const MenuContextTrigger = (props: ComponentProps<'div'>) => (
  <div {...mergeProps(useMenu().getContextTriggerProps(), props)} />
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
