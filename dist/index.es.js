import { jsx, jsxs } from 'react/jsx-runtime';
import React from 'react';

function BreaseAction(action, data) {
    if (typeof window !== 'undefined' && window.parent) {
        window.parent.postMessage({
            action: action,
            data: Object.assign(Object.assign({}, data), { scrollY: window.scrollY })
        }, '*');
    }
}
const BreaseEditButton = ({ id }) => {
    const buttonRef = React.useRef(null);
    React.useEffect(() => {
        const handleClick = () => {
            BreaseAction('BreaseEditSection', { uuid: id });
        };
        const button = buttonRef.current;
        if (button) {
            button.addEventListener('click', handleClick);
        }
        return () => {
            if (button) {
                button.removeEventListener('click', handleClick);
            }
        };
    }, [id]);
    return (jsx("button", { ref: buttonRef, className: 'BreaseEditButton', children: "Edit" }));
};

function SectionToolbar({ data }) {
    return jsxs("div", { className: 'BreaseSectionToolbar', children: [jsx("div", { className: '', children: jsx("span", { className: 'BreaseSectionTitle', children: data.name }) }), jsx("div", { className: 'BreaseToolbarActions', children: jsx(BreaseEditButton, { id: data.uuid }) })] });
}

export { BreaseEditButton, SectionToolbar };
//# sourceMappingURL=index.es.js.map
