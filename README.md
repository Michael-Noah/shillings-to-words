# shillings-to-words

A Javascript library that converts a currency value (in numeric representation) to word-representation (specifically for shillings currencies).

Example `3,592 => Three thousand five hundred and ninety-two shillings`.

- Negative values are not allowed.
- Decimals will be regarded as cents.
- Fractions will be ignored.
- Converts numbers up to the maximum safe Number value: `9007199254740992`

## Installation

`npm install shillings-to-words`

## Usage

```javascript
const shillingsToWords = require("shillings-to-words");

shillingsToWords(3982); //"Three thousand nine hundred and eighty-two shillings."
```
