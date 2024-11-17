// credits: https://github.com/chakra-ui/ark/blob/4c7a83c4e121add3cfb064c1a5ff17dce1c4cb5a/packages/react/src/components/factory.ts
// Do not replace with '@zag-js/react'
import { mergeProps } from '@zag-js/core'
import type React from 'react'
import {
  Children,
  type ComponentPropsWithoutRef,
  type JSX,
  cloneElement,
  createElement,
  forwardRef,
  isValidElement,
  memo,
} from 'react'

type PossibleRef<T> = React.Ref<T | null> | undefined

function setRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref !== null && ref !== undefined) {
    ;(ref as React.MutableRefObject<T>).current = value
  }
}

export function composeRefs<T>(...refs: PossibleRef<T>[]): (node: T | null) => void {
  return (node) => {
    for (const ref of refs) {
      setRef(ref, node)
    }
  }
}

export interface PolymorphicProps {
  /**
   * Use the provided child element as the default rendered element, combining their props and behavior.
   */
  asChild?: boolean
}

type JsxElements = { [E in keyof JSX.IntrinsicElements]: ArkForwardRefComponent<E> }
type ArkForwardRefComponent<E extends React.ElementType> = React.ForwardRefExoticComponent<
  ArkPropsWithRef<E>
>
type ArkPropsWithRef<E extends React.ElementType> = React.ComponentPropsWithRef<E> &
  PolymorphicProps

// Credits to the Radix team
function getRef(element: React.ReactElement) {
  // React <=18 in DEV
  let getter = Object.getOwnPropertyDescriptor(element.props, 'ref')?.get
  let mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning
  if (mayWarn) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    return (element as any).ref
  }

  // React 19 in DEV
  getter = Object.getOwnPropertyDescriptor(element, 'ref')?.get
  mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning
  if (mayWarn) {
    return element.props.ref
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return element.props.ref || (element as any).ref
}

const withAsChild = (Component: React.ElementType) => {
  const Comp = memo(
    forwardRef<unknown, ArkPropsWithRef<typeof Component>>((props, ref) => {
      const { asChild, children, ...restProps } = props

      if (!asChild) {
        return createElement(Component, { ...restProps, ref }, children)
      }

      const onlyChild: React.ReactNode = Children.only(children)

      if (!isValidElement(onlyChild)) {
        return null
      }

      const childRef = getRef(onlyChild)

      return cloneElement(onlyChild, {
        ...mergeProps(restProps, onlyChild.props),
        ref: ref ? composeRefs(ref, childRef) : childRef,
      })
    }),
  )

  // @ts-expect-error - it exists
  Comp.displayName = Component.displayName || Component.name

  return Comp
}

export type HTMLProps<T extends keyof JSX.IntrinsicElements> = ComponentPropsWithoutRef<T>
export type HTMLArkProps<T extends keyof JSX.IntrinsicElements> = HTMLProps<T> & PolymorphicProps

export const jsxFactory = () => {
  const cache = new Map()

  return new Proxy(withAsChild, {
    apply(_target, _thisArg, argArray) {
      return withAsChild(argArray[0])
    },
    get(_, element) {
      const asElement = element as React.ElementType
      if (!cache.has(asElement)) {
        cache.set(asElement, withAsChild(asElement))
      }
      return cache.get(asElement)
    },
  }) as unknown as JsxElements
}

export const ark = jsxFactory()
