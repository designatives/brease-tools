'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');

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
    return (jsxRuntime.jsx("button", { ref: buttonRef, className: 'BreaseEditButton', children: "Edit" }));
};

function SectionToolbar({ data }) {
    return jsxRuntime.jsxs("div", { className: 'BreaseSectionToolbar', children: [jsxRuntime.jsx("div", { className: '', children: jsxRuntime.jsx("span", { className: 'BreaseSectionTitle', children: data.name }) }), jsxRuntime.jsx("div", { className: 'BreaseToolbarActions', children: jsxRuntime.jsx(BreaseEditButton, { id: data.uuid }) })] });
}

exports.BreaseEditButton = BreaseEditButton;
exports.SectionToolbar = SectionToolbar;
//# sourceMappingURL=index.js.map
