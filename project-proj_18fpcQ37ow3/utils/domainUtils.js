// Utility functions for domain handling

/**
 * Check if the app is running on a custom domain (not trickle.host)
 * @returns {boolean} True if on a custom domain, false otherwise
 */
function isCustomDomain() {
    if (typeof window === 'undefined') return false;
    return !window.location.hostname.includes('trickle.host');
}

/**
 * Get the current domain name
 * @returns {string} The current domain name
 */
function getCurrentDomain() {
    if (typeof window === 'undefined') return '';
    return window.location.hostname;
}

/**
 * Check if the app is running in production mode
 * @returns {boolean} True if in production, false otherwise
 */
function isProduction() {
    return process.env.NODE_ENV === 'production';
}

/**
 * Check if AdSense should be enabled
 * @returns {boolean} True if AdSense should be enabled, false otherwise
 */
function shouldEnableAdsense() {
    return isCustomDomain() || isProduction();
}

/**
 * Format a domain for display (removes www. prefix)
 * @param {string} domain The domain to format
 * @returns {string} The formatted domain
 */
function formatDomainForDisplay(domain) {
    if (!domain) return '';
    return domain.replace(/^www\./, '');
}

/**
 * Get the base URL for the current site
 * @returns {string} The base URL
 */
function getBaseUrl() {
    if (typeof window === 'undefined') return '';
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port ? `:${window.location.port}` : '';
    return `${protocol}//${hostname}${port}`;
}
