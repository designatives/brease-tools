export function initBrease() {

    return true;
    // TODO: Implement authentication check
    if (typeof window !== 'undefined') {
        console.log('OK')
        return window.location.search.includes('breaseToken');
    }
    return false;
}

export function getVersion() {
    return "Brease 0.0.1"
}
