/* eslint-disable jsx-a11y/anchor-has-content */
import * as pagination from '@zag-js/pagination';
import { useMachine, normalizeProps, mergeProps } from '@zag-js/react';
import { ComponentProps, useId } from 'react';
import { createHookContext } from './machine-ctx';

export const [usePagination, PaginationProvider, PaginationContext] =
  createHookContext((ctx: pagination.Context) => {
    const [state, send] = useMachine(pagination.machine(ctx));

    const api = pagination.connect(state, send, normalizeProps);

    return api;
  });

export const PaginationConsumer = PaginationContext.Consumer;

export const PaginationRoot = (props: ComponentProps<'nav'>) => (
  <nav {...mergeProps(usePagination().getRootProps(), props)} />
);

export const PaginationPrevTrigger = (props: ComponentProps<'a'>) => (
  <a {...mergeProps(usePagination().getPrevTriggerProps(), props)} />
);

export const PaginationNextTrigger = (props: ComponentProps<'a'>) => (
  <a {...mergeProps(usePagination().getNextTriggerProps(), props)} />
);

export const PaginationItem = ({
  type,
  value,
  ...props
}: ComponentProps<'a'> & pagination.ItemProps) => (
  <a {...mergeProps(usePagination().getItemProps({ type, value }), props)} />
);

export const PaginationEllipsis = ({
  index,
  ...props
}: ComponentProps<'span'> & pagination.EllipsisProps) => (
  <span {...mergeProps(usePagination().getEllipsisProps({ index }), props)} />
);

export function Pagination() {
  return (
    <PaginationProvider id={useId()} count={100}>
      <div>
        <PaginationConsumer>
          {(api) =>
            api.totalPages > 1 && (
              <PaginationRoot>
                <ul>
                  <li>
                    <PaginationPrevTrigger href="#previous">
                      Previous <span className="visually-hidden">Page</span>
                    </PaginationPrevTrigger>
                  </li>
                  {api.pages.map((page, i) => {
                    if (page.type === 'page')
                      return (
                        <li key={page.value}>
                          <PaginationItem {...page} href={`#${page.value}`}>
                            {page.value}
                          </PaginationItem>
                        </li>
                      );
                    else
                      return (
                        <li key={`ellipsis-${i}`}>
                          <PaginationEllipsis index={i}>
                            &#8230;
                          </PaginationEllipsis>
                        </li>
                      );
                  })}
                  <li>
                    <PaginationNextTrigger href="#next">
                      Next <span className="visually-hidden">Page</span>
                    </PaginationNextTrigger>
                  </li>
                </ul>
              </PaginationRoot>
            )
          }
        </PaginationConsumer>
      </div>
    </PaginationProvider>
  );
}
