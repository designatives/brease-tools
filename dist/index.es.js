function BreaseAction(action, data) {
    if (typeof window !== 'undefined' && window.parent) {
        window.parent.postMessage({
            action: action,
            data: Object.assign(Object.assign({}, data), { scrollY: window.scrollY })
        }, '*');
    }
}
function createBreaseEditButton({ id }) {
    const button = document.createElement('button');
    button.textContent = 'Edit';
    button.className = 'brease-edit-button';
    button.addEventListener('click', () => {
        BreaseAction('BreaseEditSection', { uuid: id });
    });
    return button;
}
// Helper function to insert the button into the DOM
function insertBreaseEditButton(container, id) {
    const button = createBreaseEditButton({ id });
    container.appendChild(button);
    return button;
}

function createSectionToolbar(data) {
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
    const editButton = createBreaseEditButton({ id: data.uuid });
    actionsContainer.appendChild(editButton);
    // Assemble the toolbar
    container.appendChild(titleContainer);
    container.appendChild(actionsContainer);
    return container;
}
// Helper function to insert the toolbar into the DOM
function insertSectionToolbar(parent, data) {
    const toolbar = createSectionToolbar(data);
    parent.appendChild(toolbar);
    return toolbar;
}

export { createBreaseEditButton, createSectionToolbar, insertBreaseEditButton, insertSectionToolbar };
//# sourceMappingURL=index.es.js.map
