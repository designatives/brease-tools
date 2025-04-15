import React from 'react';

interface BreaseEditButtonProps {
    id: string;
}

function BreaseAction(action: string, data: any): void {
    if (typeof window !== 'undefined' && window.parent) {
        window.parent.postMessage(
            {
                action: action,
                data: {
                    ...data,
                    scrollY: window.scrollY,
                }
            },
            '*'
        );
    }
}

export function createBreaseEditButton({ id }: BreaseEditButtonProps): HTMLButtonElement {
    const button = document.createElement('button');
    button.textContent = 'Edit';
    button.className = 'brease-edit-button';
    
    button.addEventListener('click', () => {
        BreaseAction('BreaseEditSection', { uuid: id });
    });
    
    return button;
}

// Helper function to insert the button into the DOM
export function insertBreaseEditButton(container: HTMLElement, id: string): HTMLButtonElement {
    const button = createBreaseEditButton({ id });
    container.appendChild(button);
    return button;
}
