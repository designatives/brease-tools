interface ToggleSectionButtonOptions {
    initialOpen?: boolean;
}

export function createToggleSectionButton(options: ToggleSectionButtonOptions = {}): HTMLButtonElement {
    // Create button element
    const button = document.createElement('button');
    button.className = 'brease-toggle-section-button';
    
    // Set initial state (default to open)
    let isOpen = options.initialOpen !== undefined ? options.initialOpen : true;
    button.setAttribute('data-open', isOpen.toString());
    
    // Create SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('width', '14');
    svg.setAttribute('height', '14');
    svg.setAttribute('viewBox', '0 0 14 14');
    svg.setAttribute('fill', 'none');
    
    // Create path element
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M3.5 5.25L7 8.75L10.5 5.25');
    path.setAttribute('stroke', '#07080A');
    path.setAttribute('stroke-width', '1.2');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    
    // Assemble SVG
    svg.appendChild(path);
    button.appendChild(svg);
    
    // Add click event listener
    button.addEventListener('click', (e: Event) => {
        // Toggle state
        isOpen = !isOpen;
        button.setAttribute('data-open', isOpen.toString());
        
        // Find the wrapper element (3 levels up)
        const target = e.target as HTMLElement;
        const breasewrapper = target.closest('.brease-section-toolbar')?.parentElement;
        
        // Toggle class on wrapper element
        if (breasewrapper) {
            if (isOpen) {
                breasewrapper.classList.remove('brease-section-hide');
            } else {
                breasewrapper.classList.add('brease-section-hide');
            }
        }
    });
    
    return button;
}

// Helper function to insert the button into the DOM
export function insertToggleSectionButton(
    container: HTMLElement, 
    options: ToggleSectionButtonOptions = {}
): HTMLButtonElement {
    const button = createToggleSectionButton(options);
    container.appendChild(button);
    return button;
}