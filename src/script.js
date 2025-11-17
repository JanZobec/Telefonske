/**
 * Extracts only digits from a string and trims whitespace
 * @param {string|number} txt - Input string or number to process
 * @returns {string} String containing only digits
 */
export function trim(txt) {
    txt = String(txt);
    return txt.replace(/[^\d]/g, '');
}

/**
 * Converts Slovenian phone numbers to international format (00386)
 *
 * Handles various input formats and normalizes them to the standard international format.
 * The function separates the international part from the local number, standardizes both,
 * and joins them together.
 *
 * @param {string} txt - Phone number in any format (e.g., "051234567", "00386 51 234 567", "+386 51 234567", "386 51234567")
 * @returns {string} Standardized phone number in international format (00386XXXXXXXX) or empty string if invalid
 *
 * @example
 * telefon386("051234567")           // returns "0038651234567"
 * telefon386("+386 51 234-567")     // returns "0038651234567"
 * telefon386("00386 51 234 567")    // returns "0038651234567"
 * telefon386("386 51234567")        // returns "0038651234567"
 * telefon386("51234567")            // returns "0038651234567" (8-digit local number)
 * telefon386("")                    // returns ""
 *
 * Supported input formats:
 * - Local format with leading 0: "051234567"
 * - International with 00: "00386 51234567"
 * - International with +: "+386 51234567" (cleaned by trim function)
 * - Country code only: "386 51234567"
 * - 8-digit local number: "51234567"
 * - With spaces/dashes/parentheses (cleaned by trim function)
 */
export function telefon386(txt) {
    txt = trim(txt);

    if (txt === '') {
        return '';
    }

    // Separate international part from local number
    let internationalPart = '';
    let localNumber = '';

    // Extract international prefix
    if (txt.startsWith('00386')) {
        internationalPart = '00386';
        localNumber = txt.substring(5);
    } else if (txt.startsWith('0386')) {
        internationalPart = '00386';
        localNumber = txt.substring(4);
    } else if (txt.startsWith('386')) {
        internationalPart = '00386';
        localNumber = txt.substring(3);
    } else if (txt.startsWith('00')) {
        // Other international format - keep as is after 00
        return txt;
    } else if (txt.startsWith('0')) {
        // Local format with leading 0
        internationalPart = '00386';
        localNumber = txt.substring(1);
    } else if (txt.length === 8) {
        // 8-digit local number without prefix
        internationalPart = '00386';
        localNumber = txt;
    } else {
        // Assume it's already in some format
        localNumber = txt;
    }

    // If we have an international part and local number starts with 0, remove it
    if (internationalPart !== '' && localNumber.startsWith('0')) {
        localNumber = localNumber.substring(1);
    }

    // Standardize: join international part with local number
    const result = internationalPart + localNumber;

    // Validate final length (Slovenia numbers should be 11 digits total: 386 + 8 digits)
    if (result.length < 6) {
        return '';
    }

    return result;
}

// Example usage:
console.log(trim('abc123def')); // "123"
console.log(telefon386('051234567')); // "0038651234567"
console.log(telefon386('+386 (51) 234-567')); // "0038651234567"
