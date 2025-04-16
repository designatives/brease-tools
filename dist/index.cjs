'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "header{display:none}figure{max-height:unset;overflow:unset}figure.brease-section-hide{max-height:48px;overflow:hidden}.brease-section-toolbar{align-items:center;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);background-color:rgba(245,246,248,.6);border-bottom:1px solid #e2e4ea;box-sizing:border-box;display:flex;height:46px;justify-content:space-between;padding:8px 16px;position:sticky;top:0;z-index:1000}.brease-section-toolbar .brease-section-title{color:#282b32;font-weight:500}.brease-section-toolbar .brease-toolbar-actions{align-items:center;display:flex;gap:12px}.brease-section-toolbar .brease-edit-button{align-items:center;background-color:#07080a;border:none;border-radius:44px;color:#fff;cursor:pointer;display:flex;font-size:12px;font-weight:500;height:30px;padding:0 10px}.brease-section-toolbar .brease-toggle-section-button{align-items:center;background-color:#fff;border:1px solid #e2e4ea;border-radius:50%;cursor:pointer;display:flex;height:30px;justify-content:center;width:30px}.brease-section-toolbar .brease-toggle-section-button svg{pointer-events:none;transform:rotate(180deg);transition:transform .3s ease-in-out}.brease-section-toolbar .brease-toggle-section-button[data-open=false] svg{transform:rotate(0deg)}.brease-section-toolbar+section{opacity:1;transition:opacity .5s ease-in-out,margin .5s ease-in-out}.brease-section-toolbar:hover+section{opacity:.6}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUNJLFlBQ0osQ0FFQSxPQUNJLGdCQUFpQixDQUNqQixjQUNKLENBRUEsMkJBQ0ksZUFBZ0IsQ0FDaEIsZUFDSixDQUdBLHdCQVNJLGtCQUFtQixDQVBuQiwwQkFBMkIsQ0FDM0Isa0NBQW1DLENBRm5DLHFDQUEwQyxDQUcxQywrQkFBZ0MsQ0FPaEMscUJBQXNCLENBSHRCLFlBQWEsQ0FIYixXQUFZLENBS1osNkJBQThCLENBSjlCLGdCQUFpQixDQU1qQixlQUFnQixDQUNoQixLQUFNLENBTk4sWUFPSixDQUVBLDhDQUVJLGFBQWMsQ0FEZCxlQUVKLENBRUEsZ0RBRUksa0JBQW1CLENBRG5CLFlBQWEsQ0FFYixRQUNKLENBR0EsNENBVUksa0JBQW1CLENBVG5CLHdCQUF5QixDQUN6QixXQUFZLENBQ1osa0JBQW1CLENBSW5CLFVBQWMsQ0FDZCxjQUFlLENBR2YsWUFBYSxDQU5iLGNBQWUsQ0FDZixlQUFnQixDQUdoQixXQUFZLENBTFosY0FRSixDQUdBLHNEQVFJLGtCQUFtQixDQVBuQixxQkFBeUIsQ0FDekIsd0JBQXlCLENBQ3pCLGlCQUFrQixDQUdsQixjQUFlLENBR2YsWUFBYSxDQUpiLFdBQVksQ0FFWixzQkFBdUIsQ0FIdkIsVUFNSixDQUVBLDBEQUdJLG1CQUFvQixDQUZwQix3QkFBeUIsQ0FDekIsb0NBRUosQ0FFQSwyRUFDSSxzQkFDSixDQUdBLGdDQUNJLFNBQVUsQ0FDVix5REFDSixDQUVBLHNDQUNJLFVBQ0oiLCJmaWxlIjoiaW5kZXguY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQmFzZSBlbGVtZW50IHN0eWxpbmcgKi9cbmhlYWRlciB7XG4gICAgZGlzcGxheTogbm9uZTsgLyogSGlkZSB0aGUgaGVhZGVyIGluIHByZXZpZXcgbW9kZSAqL1xufVxuXG5maWd1cmUge1xuICAgIG1heC1oZWlnaHQ6IHVuc2V0O1xuICAgIG92ZXJmbG93OiB1bnNldDtcbn1cblxuZmlndXJlLmJyZWFzZS1zZWN0aW9uLWhpZGUge1xuICAgIG1heC1oZWlnaHQ6IDQ4cHg7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLyogU2VjdGlvbiBUb29sYmFyICovXG4uYnJlYXNlLXNlY3Rpb24tdG9vbGJhciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNDUsIDI0NiwgMjQ4LCAwLjYpO1xuICAgIGJhY2tkcm9wLWZpbHRlcjogYmx1cigyMHB4KTtcbiAgICAtd2Via2l0LWJhY2tkcm9wLWZpbHRlcjogYmx1cigyMHB4KTtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI0UyRTRFQTtcbiAgICBoZWlnaHQ6IDQ2cHg7XG4gICAgcGFkZGluZzogOHB4IDE2cHg7XG4gICAgei1pbmRleDogMTAwMDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgcG9zaXRpb246IHN0aWNreTtcbiAgICB0b3A6IDA7XG59XG5cbi5icmVhc2Utc2VjdGlvbi10b29sYmFyIC5icmVhc2Utc2VjdGlvbi10aXRsZSB7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICBjb2xvcjogIzI4MkIzMjtcbn1cblxuLmJyZWFzZS1zZWN0aW9uLXRvb2xiYXIgLmJyZWFzZS10b29sYmFyLWFjdGlvbnMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDEycHg7XG59XG5cbi8qIEVkaXQgQnV0dG9uICovXG4uYnJlYXNlLXNlY3Rpb24tdG9vbGJhciAuYnJlYXNlLWVkaXQtYnV0dG9uIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDcwODBBO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBib3JkZXItcmFkaXVzOiA0NHB4O1xuICAgIHBhZGRpbmc6IDAgMTBweDtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICBjb2xvcjogI0ZGRkZGRjtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgaGVpZ2h0OiAzMHB4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZGlzcGxheTogZmxleDtcbn1cblxuLyogVG9nZ2xlIFNlY3Rpb24gQnV0dG9uICovXG4uYnJlYXNlLXNlY3Rpb24tdG9vbGJhciAuYnJlYXNlLXRvZ2dsZS1zZWN0aW9uLWJ1dHRvbiB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjRTJFNEVBO1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICB3aWR0aDogMzBweDtcbiAgICBoZWlnaHQ6IDMwcHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZGlzcGxheTogZmxleDtcbn1cblxuLmJyZWFzZS1zZWN0aW9uLXRvb2xiYXIgLmJyZWFzZS10b2dnbGUtc2VjdGlvbi1idXR0b24gc3ZnIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xuICAgIHRyYW5zaXRpb246IDMwMG1zIHRyYW5zZm9ybSBlYXNlLWluLW91dDtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cblxuLmJyZWFzZS1zZWN0aW9uLXRvb2xiYXIgLmJyZWFzZS10b2dnbGUtc2VjdGlvbi1idXR0b25bZGF0YS1vcGVuPVwiZmFsc2VcIl0gc3ZnIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcbn1cblxuLyogU2VjdGlvbiB0cmFuc2l0aW9uIGVmZmVjdHMgKi9cbi5icmVhc2Utc2VjdGlvbi10b29sYmFyICsgc2VjdGlvbiB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2l0aW9uOiA1MDBtcyBvcGFjaXR5IGVhc2UtaW4tb3V0LCA1MDBtcyBtYXJnaW4gZWFzZS1pbi1vdXQ7XG59XG5cbi5icmVhc2Utc2VjdGlvbi10b29sYmFyOmhvdmVyICsgc2VjdGlvbiB7XG4gICAgb3BhY2l0eTogMC42O1xufSJdfQ== */";
styleInject(css_248z);

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
    return (jsxRuntime.jsx("button", { ref: buttonRef, className: 'brease-edit-button', children: "Edit" }));
};

function SectionToolbar({ data }) {
    return jsxRuntime.jsxs("div", { className: 'brease-section-toolbar', children: [jsxRuntime.jsx("div", { children: jsxRuntime.jsx("span", { className: 'brease-section-title', children: data.name }) }), jsxRuntime.jsx("div", { className: 'brease-toolbar-actions', children: jsxRuntime.jsx(BreaseEditButton, { id: data.uuid }) })] });
}

function initReactBrease() {
    return true;
}
function getReactVersion() {
    return "Brease 0.0.1";
}

function initTSBrease() {
    return true;
}
function getTSVersion() {
    return "Brease 0.0.1";
}

exports.BreaseEditButton = BreaseEditButton;
exports.SectionToolbar = SectionToolbar;
exports.getReactVersion = getReactVersion;
exports.getTSVersion = getTSVersion;
exports.initReactBrease = initReactBrease;
exports.initTSBrease = initTSBrease;
//# sourceMappingURL=index.cjs.map
