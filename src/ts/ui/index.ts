export function initTSBrease() {

    return true;
    // TODO: Implement authentication check
    if (typeof window !== 'undefined') {
        console.log('OK')
        return window.location.search.includes('breaseToken');
    }
    return false;
}

export function getTSVersion() {
    return "Brease 0.0.1"
}
