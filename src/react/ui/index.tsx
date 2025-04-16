export function initReactBrease() {

    return true;
    // TODO: Implement authentication check
    if (typeof window !== 'undefined') {
        console.log('OK')
        return window.location.search.includes('breaseToken');
    }
    return false;
}

export function getReactVersion() {
    return "Brease 0.0.1"
}

export { SectionToolbar } from './SectionToolbar';
export { BreaseEditButton } from './SectionToolbar/SectionEditButton';
