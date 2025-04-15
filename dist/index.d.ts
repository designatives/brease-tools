interface SectionToolbarData {
    name: string;
    uuid: string;
    [key: string]: any;
}
declare function createSectionToolbar(data: SectionToolbarData): HTMLDivElement;
declare function insertSectionToolbar(parent: HTMLElement, data: SectionToolbarData): HTMLDivElement;

interface BreaseEditButtonProps {
    id: string;
}
declare function createBreaseEditButton({ id }: BreaseEditButtonProps): HTMLButtonElement;
declare function insertBreaseEditButton(container: HTMLElement, id: string): HTMLButtonElement;

export { createBreaseEditButton, createSectionToolbar, insertBreaseEditButton, insertSectionToolbar };
export type { SectionToolbarData };
