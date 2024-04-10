function convert(numberInput) {
  let numericalRepresentation = Number.parseFloat(numberInput);
  if (Number.isNaN(numericalRepresentation)) {
      throw new Error("Input must be a valid number.");
  }
  if (numericalRepresentation < 0) {
      throw new Error("Cannot convert negative value.");
  }

  let [shillingsPart, centPart] = numericalRepresentation.toString().split('.').concat('0');
  shillingsPart = parseInt(shillingsPart, 10);
  centPart = parseInt(centPart.substring(0, 2).padEnd(2, '0'), 10);

  let shillingsInWords = convertIntegerValue(shillingsPart) + " shillings";
  let centsInWords = centPart > 0 ? ` and ${convertIntegerValue(centPart)} cents` : '';

  return shillingsInWords + centsInWords;
}

function convertIntegerValue(number) {
  const units = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  const teens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

  if (number < 20) {
      return number < 10 ? units[number] : teens[number - 10];
  } else if (number < 100) {
      return `${tens[Math.floor(number / 10)]}${number % 10 ? "-" + units[number % 10] : ""}`;
  } else if (number < 1000) {
      return `${units[Math.floor(number / 100)]} hundred${number % 100 === 0 ? "" : " and " + convertIntegerValue(number % 100)}`;
  }

  const scaleNames = ["thousand", "million", "billion", "trillion", "quadrillion"];
  const scaleValues = [1e3, 1e6, 1e9, 1e12, 1e15];

  let parts = [];

  for (let i = scaleValues.length - 1; i >= 0; i--) {
      if (number >= scaleValues[i]) {
          const scaleNumber = Math.floor(number / scaleValues[i]);
          parts.push(`${convertIntegerValue(scaleNumber)} ${scaleNames[i]}`);
          number %= scaleValues[i];
      }
  }

  if (number > 0) {
      parts.push(convertIntegerValue(number));
  }

  return parts.join(", ");
}

module.exports = convert;