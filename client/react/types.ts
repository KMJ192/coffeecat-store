interface React {
  useState<T>(initState: T): [T, (newVal: T) => void];
  useState<T = undefined>(
    initState?: T,
  ): [T | undefined, (newVal: T | undefined) => void];
  useEffect(effect: () => any, deps?: readonly any[]): void;
  routeRender(): void;
}

interface ReactClosureOptions {
  stateKey: number;
  states: any[];
  root: Element | null;
  component?: (() => ReactDOM[]) | (() => ReactDOM) | null;
  unmount?: () => void;
  callbackResult?: any;
  focusElement?: HTMLElement;
  prevDOM?: ReactDOM | ReactDOM[];
  activeNode: Element | null;
}

interface ReactDOM {
  tagName?: string;
  props?: { [key: string]: string };
  event?:
    | {
        type: string;
        eventFunc: () => void;
      }
    | {
        type: string;
        eventFunc: () => void;
      }[];
  key?: any;
  frontStringNode?: string;
  backStringNode?: string;
  childNode?: ReactDOM | ReactDOM[] | string;
  node?: HTMLElement;
  dirty?: boolean;
}

export { React, ReactClosureOptions, ReactDOM };
