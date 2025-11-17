# Slovenian Phone Number Formatter

Converts Slovenian phone numbers to standardized international format (00386).

Handles various input formats including local numbers with leading 0, international formats with + or 00, and plain 8-digit numbers. Automatically removes non-digit characters like spaces, dashes, and parentheses.

## Usage

```javascript
import { telefon386 } from './src/script.js';

telefon386('051234567');          // "0038651234567"
telefon386('+386 51 234-567');    // "0038651234567"
telefon386('386 51234567');       // "0038651234567"
telefon386('51234567');           // "0038651234567" (8-digit local)
```

## Supported Formats

- Local: `051234567`
- International: `+386 51 234567`, `00386 51 234567`
- Country code: `386 51234567`
- 8-digit local: `51234567`
- With separators: spaces, dashes, parentheses

## Development

```bash
npm install
npm test          # Run tests with Vitest
```
