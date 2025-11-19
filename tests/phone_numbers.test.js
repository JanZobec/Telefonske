import { describe, it, expect } from 'vitest';
import { telefon386, trim } from '../src/script.js';

describe('trim', () => {
    const cases = [
        [' abc 123 def ', '123'],
        [' +386 (51) 234-567 ', '38651234567'],
        [' (0) 51-234-567 ', '051234567'],
        ['No digits!', ''],
        [1, '1'],
        [12345, '12345'],
        [null, ''],
        [undefined, ''],
        ['', ''],
        ['  00486  ', '00486'],
        ['  +1-800-555-0199  ', '18005550199'],
        ['  (123) 456 7890  ', '1234567890'],
        ['  abc 123 def 456 ', '123456'],
    ];

    const runTests = (testName, fn) => {
        it(testName, () => {
            cases.forEach(([input, expected]) => {
                expect(fn(input)).toBe(expected);
            });
        });
    };

    runTests('should trim non-digit characters', trim);
    runTests('should trim non-digit characters idempotent', (input) =>
        trim(trim(trim(input)))
    );
});

describe('telefon386', () => {
    const runTests = (testName, cases, fn) => {
        it(testName, () => {
            cases.forEach(([input, expected]) => {
                expect(fn(input)).toBe(expected);
            });
        });
    };

    const cases_local = [
        ['051234567', '0038651234567'],
        ['51234567', '0038651234567'],
        ['0038651234567', '0038651234567'],
        ['038651234567', '0038651234567'],
        ['0038651', '0038651'],
        ['386051234567', '0038651234567'],
        ['051641088', '0038651641088'],
        ['+38651234567', '0038651234567'],
        ['38651234567', '0038651234567'],
        ['386051234567', '0038651234567'],
    ];
    runTests('should format local number correctly', cases_local, telefon386);
    runTests(
        'should format local number correctly idempotent',
        cases_local,
        (input) => telefon386(telefon386(telefon386(input)))
    );

    const cases_intl = [
        ['+386 (51) 234-567', '0038651234567'],
        ['00386123456', '00386123456'],
        ['00386 51 234 567', '0038651234567'],
        ['00 386 51 234 567', '0038651234567'],
        ['0038551234567', '0038551234567'], // Croatia
        ['0038501234567', '0038501234567'], // Croatia
        ['+1-800-555-0199', '18005550199'], // US number
        ['00486 123 4567', '004861234567'], // Poland
        ['+44 20 7946 0958', '442079460958'], // UK number
    ];
    runTests('should handle international formats', cases_intl, telefon386);
    runTests(
        'should handle international formats idempotent',
        cases_intl,
        (input) => telefon386(telefon386(telefon386(input)))
    );

    const cases_edge = [
        ['00000000000', '00000000000'],
        ['0000000', '0000000'],
        ['1234567', '1234567'],
        ['511234', '511234'],
        ['00386-0123-45678', '0038612345678'],
        ['+386-0123-45678', '0038612345678'],
        ['0386-0123-45678', '0038612345678'],
        ['0386-123-45678', '0038612345678'],
        ['+386-123-45678', '0038612345678'],
        ['+386(0)123-456/78 Janez', '0038612345678'],
        ['Stric +386(0)123-456/78 Jan', '0038612345678'],
    ];
    runTests('should handle edge cases', cases_edge, telefon386);
    runTests('should handle edge cases idempotent', cases_edge, (input) =>
        telefon386(telefon386(telefon386(input)))
    );

    const cases_short = [
        ['', ''],
        ['   ', ''],
        ['12', ''],
        ['123', ''],
        ['1234', ''],
        ['12345', ''],
        ['123456', '123456'],
        ['0', ''],
        ['386', ''],
        ['00386', ''],
        ['003', '003'],
    ];
    runTests('should handle short numbers correctly', cases_short, telefon386);
    runTests(
        'should handle short numbers correctly idempotent',
        cases_short,
        (input) => telefon386(telefon386(telefon386(input)))
    );
});
