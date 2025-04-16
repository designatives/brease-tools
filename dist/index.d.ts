import * as react_jsx_runtime from 'react/jsx-runtime';

declare function SectionToolbar({ data }: {
    data: any;
}): react_jsx_runtime.JSX.Element;

interface BreaseEditButtonProps {
    id: string;
}
declare const BreaseEditButton: ({ id }: BreaseEditButtonProps) => react_jsx_runtime.JSX.Element;

declare function initReactBrease(): boolean;
declare function getReactVersion(): string;

declare function initTSBrease(): boolean;
declare function getTSVersion(): string;

export { BreaseEditButton, SectionToolbar, getReactVersion, getTSVersion, initReactBrease, initTSBrease };
