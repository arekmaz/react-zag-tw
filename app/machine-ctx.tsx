/* eslint-disable jsx-a11y/label-has-associated-control */
import { createContext, PropsWithChildren, useContext } from 'react';

export const createHookContext = <Props extends object, O>(
  hook: (a: Props) => O
) => {
  const defaultValue = {};
  const Context = createContext<O>(defaultValue as O);

  const Provider = ({ children, ...props }: PropsWithChildren<Props>) => {
    const output = hook(props as Props);
    return <Context.Provider value={output}>{children}</Context.Provider>;
  };

  const useCtx = () => {
    const val = useContext(Context);

    if (val === defaultValue) {
      throw new Error('hook used outside of the provider');
    }

    return val;
  };

  return [useCtx, Provider, Context] as const;
};
