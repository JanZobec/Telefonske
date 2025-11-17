import { describe, it, expect } from 'vitest';
import { telefon386, trim } from '../src/script.js';

describe('telefon386', () => {
    it('should trim non-digit characters', () => {
        expect(trim(' abc 123 def ')).toBe('123');
        expect(trim(' +386 (51) 234-567 ')).toBe('38651234567');
        expect(trim(' (0) 51-234-567 ')).toBe('051234567');
        expect(trim('No digits!')).toBe('');
        expect(trim(1)).toBe('1');
        expect(trim(12345)).toBe('12345');
        expect(trim(null)).toBe('');
        expect(trim(undefined)).toBe('');
        expect(trim('')).toBe('');
        expect(trim('  00486  ')).toBe('00486');
        expect(trim('  +1-800-555-0199  ')).toBe('18005550199');
        expect(trim('  (123) 456 7890  ')).toBe('1234567890');
        expect(trim('  abc 123 def 456 ')).toBe('123456');
    });
    it('should format local number correctly', () => {
        expect(telefon386('051234567')).toBe('0038651234567');
        expect(telefon386('51234567')).toBe('0038651234567');
        expect(telefon386('0038651234567')).toBe('0038651234567');
        expect(telefon386('038651234567')).toBe('0038651234567');
        expect(telefon386('0038651')).toBe('0038651');
        expect(telefon386('386051234567')).toBe('0038651234567');
        expect(telefon386('051641088')).toBe('0038651641088');
        expect(telefon386('+38651234567')).toBe('0038651234567');
    });
    it('should handle international formats', () => {
        expect(telefon386('+386 (51) 234-567')).toBe('0038651234567');
        expect(telefon386('00386 51 234 567')).toBe('0038651234567');
        expect(telefon386('00 386 51 234 567')).toBe('0038651234567');
        expect(telefon386('0038551234567')).toBe('0038551234567'); // Croatia
        expect(telefon386('0038501234567')).toBe('0038501234567'); // Croatia
        expect(telefon386('+1-800-555-0199')).toBe('18005550199'); // US number, should return ''
        expect(telefon386('00486 123 4567')).toBe('004861234567'); // Poland
        expect(telefon386('+44 20 7946 0958')).toBe('442079460958'); // UK number, should return ''
    });
    it('should handle edge cases', () => {
        expect(telefon386('00000000000')).toBe('00000000000');
        expect(telefon386('0000000')).toBe('0000000');
        expect(telefon386('1234567')).toBe('1234567');
        expect(telefon386('511234')).toBe('511234');
        expect(telefon386('00386-0123-45678')).toBe('0038612345678');
        expect(telefon386('+386-0123-45678')).toBe('0038612345678');
        expect(telefon386('0386-0123-45678')).toBe('0038612345678');
        expect(telefon386('0386-123-45678')).toBe('0038612345678');
        expect(telefon386('+386-123-45678')).toBe('0038612345678');
        expect(telefon386('+386(0)123-456/78 Janez')).toBe('0038612345678');
        expect(telefon386('Stric +386(0)123-456/78 Jan')).toBe('0038612345678');
        expect(telefon386('00386123456')).toBe('00386123456');
    });
    it('should handle short numbers correctly', () => {
        expect(telefon386('')).toBe('');
        expect(telefon386('   ')).toBe('');
        expect(telefon386('12')).toBe('');
        expect(telefon386('123')).toBe('');
        expect(telefon386('1234')).toBe('');
        expect(telefon386('12345')).toBe('');
        expect(telefon386('123456')).toBe('123456');
        expect(telefon386('0')).toBe('');
        expect(telefon386('386')).toBe('');
        expect(telefon386('00386')).toBe('');
        expect(telefon386('003')).toBe('003');
    });
});
