import 'styles/index.css'
import { createBreaseEditButton } from "./SectionEditButton";

export interface SectionToolbarData {
    name: string;
    uuid: string;
    [key: string]: any;
}

export function createSectionToolbar(data: SectionToolbarData): HTMLDivElement {
    // Create main container
    const container = document.createElement('div');
    container.className = 'brease-section-toolbar';
    
    // Create title section
    const titleContainer = document.createElement('div');
    const title = document.createElement('span');
    title.className = 'brease-section-title';
    title.textContent = data.name;
    titleContainer.appendChild(title);
    
    // Create actions section
    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'brease-toolbar-actions';
    
    // Create and add edit button
    const editButton = createBreaseEditButton({ id: data.page_section_uuid });
    actionsContainer.appendChild(editButton);
    
    // Assemble the toolbar
    container.appendChild(titleContainer);
    container.appendChild(actionsContainer);
    
    return container;
}

// Helper function to insert the toolbar into the DOM
export function insertSectionToolbar(parent: HTMLElement, data: SectionToolbarData): HTMLDivElement {
    const toolbar = createSectionToolbar(data);
    parent.appendChild(toolbar);
    return toolbar;
}

// Helper to handle preview mode
export function handlePreviewMode(breaseNavigation: HTMLElement, breaseSections: HTMLElement[]) {
    let auth = true //TODO
    if(auth){
        breaseNavigation.classList.add('brease-preview-hidden')
        breaseSections.map((section) => {
            const previewOverlay = document.createElement('div')
            previewOverlay.classList.add('brease-preview-overlay')
            section.appendChild(previewOverlay)
        })
    } else {
        breaseNavigation.classList.remove('brease-preview-hidden')
        const overlays = document.getElementsByClassName('brease-preview-overlay')
        Array.from(overlays).forEach(overlay => {
            if(overlay.parentNode) overlay.parentNode.removeChild(overlay)
        })
    }
}

