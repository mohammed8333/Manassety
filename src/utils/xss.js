import DOMPurify from 'dompurify';

/**
 * Sanitizes an HTML string using DOMPurify.
 * @param {string} dirty 
 * @returns {string}
 */
export function sanitizeHTML(dirty) {
    if (typeof dirty !== 'string') return '';
    return DOMPurify.sanitize(dirty);
}

/**
 * Escapes an HTML string, turning special characters into entities.
 * Safe drop-in when only text content is needed.
 * @param {string} text 
 * @returns {string}
 */
export function escapeHTML(text) {
    if (typeof text !== 'string') return '';
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
