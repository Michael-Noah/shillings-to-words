const convert = require("./index");

describe("integer values (n)", () => {
  test("Edge cases around numeric scale transitions", () => {
    expect(convert(99)).toEqual("ninety-nine shillings");
    expect(convert(100)).toEqual("one hundred shillings");
    expect(convert(999)).toEqual("nine hundred and ninety-nine shillings");
    expect(convert(1000)).toEqual("one thousand shillings");
    expect(convert(999999)).toEqual("nine hundred and ninety-nine thousand, nine hundred and ninety-nine shillings");
    expect(convert(1000000)).toEqual("one million shillings");
    expect(convert(999999999)).toEqual("nine hundred and ninety-nine million, nine hundred and ninety-nine thousand, nine hundred and ninety-nine shillings");
    expect(convert(1000000000)).toEqual("one billion shillings");
    expect(convert(999999999999)).toEqual("nine hundred and ninety-nine billion, nine hundred and ninety-nine million, nine hundred and ninety-nine thousand, nine hundred and ninety-nine shillings");
    expect(convert(1000000000000)).toEqual("one trillion shillings");
  });

  test("Varied numbers within scales", () => {
    // Testing with varied numbers within each scale
    expect(convert(250)).toEqual("two hundred and fifty shillings");
    expect(convert(1234)).toEqual("one thousand, two hundred and thirty-four shillings");
    expect(convert(56789)).toEqual("fifty-six thousand, seven hundred and eighty-nine shillings");
    expect(convert(1234567)).toEqual("one million, two hundred and thirty-four thousand, five hundred and sixty-seven shillings");
    expect(convert(89012345)).toEqual("eighty-nine million, twelve thousand, three hundred and forty-five shillings");
    expect(convert(1234567890)).toEqual("one billion, two hundred and thirty-four million, five hundred and sixty-seven thousand, eight hundred and ninety shillings");
    expect(convert(4005006007008)).toEqual("four trillion, five billion, six million, seven thousand, eight shillings");
  });

  test("Close to scale transitions", () => {
    // Testing numbers just below and just above each major scale transition
    expect(convert(999)).toEqual("nine hundred and ninety-nine shillings");
    expect(convert(1001)).toEqual("one thousand, one shillings");
    expect(convert(999999)).toEqual("nine hundred and ninety-nine thousand, nine hundred and ninety-nine shillings");
    expect(convert(1000001)).toEqual("one million, one shillings");
    expect(convert(999999999)).toEqual("nine hundred and ninety-nine million, nine hundred and ninety-nine thousand, nine hundred and ninety-nine shillings");
    expect(convert(1000000001)).toEqual("one billion, one shillings");
  });
});

test("values with precise and rounded cents", () => {
  // Testing with cents that require rounding and precise cents
  expect(convert(999.995)).toEqual("nine hundred and ninety-nine shillings and ninety-nine cents");
  expect(convert(1234.567)).toEqual("one thousand, two hundred and thirty-four shillings and fifty-six cents");
  expect(convert(0.01)).toEqual("zero shillings and one cents");
  expect(convert(0.99)).toEqual("zero shillings and ninety-nine cents");
});

describe("error handling and edge cases", () => {
  // Additional error handling cases and edge case testing
  test("Extremely high values", () => {
    expect(convert(98765432109876544)).toEqual("ninety-eight quadrillion, seven hundred and sixty-five trillion, four hundred and thirty-two billion, one hundred and nine million, eight hundred and seventy-six thousand, five hundred and forty-four shillings");
  });
  test("Non-numeric strings", () => {
    expect(() => convert("one hundred")).toThrowError(/valid number/);
  });
  test("Very small decimal numbers", () => {
    expect(convert(0.00001)).toEqual("zero shillings");
  });
});

describe("integer values (n)", () => {
  test("n < 10", () => {
    expect(convert(0)).toEqual("zero shillings");
    expect(convert(1)).toEqual("one shillings");
    expect(convert(2)).toEqual("two shillings");
    expect(convert(3)).toEqual("three shillings");
    expect(convert(4)).toEqual("four shillings");
    expect(convert(5)).toEqual("five shillings");
    expect(convert(6)).toEqual("six shillings");
    expect(convert(7)).toEqual("seven shillings");
    expect(convert(8)).toEqual("eight shillings");
    expect(convert(9)).toEqual("nine shillings");
  });

  test("10 <= n < 20", () => {
    expect(convert(10)).toEqual("ten shillings");
    expect(convert(11)).toEqual("eleven shillings");
    expect(convert(12)).toEqual("twelve shillings");
    expect(convert(13)).toEqual("thirteen shillings");
    expect(convert(14)).toEqual("fourteen shillings");
    expect(convert(15)).toEqual("fifteen shillings");
    expect(convert(16)).toEqual("sixteen shillings");
    expect(convert(17)).toEqual("seventeen shillings");
    expect(convert(18)).toEqual("eighteen shillings");
    expect(convert(19)).toEqual("nineteen shillings");
  });

  test("10 < n < 100, when n is a multiple of 10", () => {
    expect(convert(20)).toEqual("twenty shillings");
    expect(convert(30)).toEqual("thirty shillings");
    expect(convert(40)).toEqual("forty shillings");
    expect(convert(50)).toEqual("fifty shillings");
    expect(convert(60)).toEqual("sixty shillings");
    expect(convert(70)).toEqual("seventy shillings");
    expect(convert(80)).toEqual("eighty shillings");
    expect(convert(90)).toEqual("ninety shillings");
  });

  test("20 < n < 100", () => {
    expect(convert(73)).toEqual("seventy-three shillings");
    expect(convert(54)).toEqual("fifty-four shillings");
    expect(convert(86)).toEqual("eighty-six shillings");
    expect(convert(31)).toEqual("thirty-one shillings");
    expect(convert(35)).toEqual("thirty-five shillings");
  });

  test("99 < n < 1,000 (hundred)", () => {
    expect(convert(101)).toEqual("one hundred and one shillings");
    expect(convert(200)).toEqual("two hundred shillings");
    expect(convert(449)).toEqual(
      "four hundred and forty-nine shillings"
    );
    expect(convert(428)).toEqual(
      "four hundred and twenty-eight shillings"
    );
    expect(convert(220)).toEqual(
      "two hundred and twenty shillings"
    );
    expect(convert(292)).toEqual(
      "two hundred and ninety-two shillings"
    );
  });

  test("1,000 <= n <= 999,999 (thousand)", () => {
    expect(convert(1000)).toEqual("one thousand shillings");
    expect(convert(5000)).toEqual("five thousand shillings");
    expect(convert(180087)).toEqual(
      "one hundred and eighty thousand, eighty-seven shillings"
    );
    expect(convert(54373)).toEqual(
      "fifty-four thousand, three hundred and seventy-three shillings"
    );
    expect(convert(10000)).toEqual("ten thousand shillings");
    expect(convert(100001)).toEqual(
      "one hundred thousand, one shillings"
    );
    expect(convert(15300)).toEqual(
      "fifteen thousand, three hundred shillings"
    );
  });

  test("1,000,000 <= n and n <= 999,999,999 (million)", () => {
    expect(convert(1836290)).toEqual(
      "one million, eight hundred and thirty-six thousand, two hundred and ninety shillings"
    );
    expect(convert(6640447)).toEqual(
      "six million, six hundred and forty thousand, four hundred and forty-seven shillings"
    );
    expect(convert(6117655)).toEqual(
      "six million, one hundred and seventeen thousand, six hundred and fifty-five shillings"
    );
    expect(convert(8965452)).toEqual(
      "eight million, nine hundred and sixty-five thousand, four hundred and fifty-two shillings"
    );
    expect(convert(4436182)).toEqual(
      "four million, four hundred and thirty-six thousand, one hundred and eighty-two shillings"
    );
    expect(convert(408207396)).toEqual(
      "four hundred and eight million, two hundred and seven thousand, three hundred and ninety-six shillings"
    );
    expect(convert(879791371)).toEqual(
      "eight hundred and seventy-nine million, seven hundred and ninety-one thousand, three hundred and seventy-one shillings"
    );
  });

  test("1,000,000,000 <= n <= 999,999,999,999 (billion)", () => {
    expect(convert(178200000000)).toEqual(
      "one hundred and seventy-eight billion, two hundred million shillings"
    );
    expect(convert(86300000000)).toEqual(
      "eighty-six billion, three hundred million shillings"
    );
  });

  test("999,999,999,999 < n <= 999,999,999,999,999 (trillion)", () => {
    expect(convert(6000000000000)).toEqual(
      "six trillion shillings"
    );
    expect(convert(6020001004303)).toEqual(
      "six trillion, twenty billion, one million, four thousand, three hundred and three shillings"
    );
  });

  test(`999,999,999,999,999 < n <= ${Number.MAX_SAFE_INTEGER} (quadrillion)`, () => {
    expect(convert(8230124567090203)).toEqual(
      "eight quadrillion, two hundred and thirty trillion, one hundred and twenty-four billion, five hundred and sixty-seven million, ninety thousand, two hundred and three shillings"
    );
  });
});

test("values with cents", () => {
  expect(convert(175.54)).toEqual(
    "one hundred and seventy-five shillings and fifty-four cents"
  );
  expect(convert(2020.666)).toEqual(
    "two thousand, twenty shillings and sixty-six cents"
  );
  expect(convert(102.1)).toEqual("one hundred and two shillings and ten cents");
});

test("string input", () => {
  expect(convert("21")).toEqual("twenty-one shillings");
});

describe("error handling", () => {
  test("negative numbers are not allowed", () => {
    expect(() => convert(-1000.98)).toThrowError(/negative value/);
  });
  test("input must be a valid number", () => {
    expect(() => convert("abc")).toThrowError(/valid number/);
  });
});

// Additional tests for edge cases and detailed formatting checks
describe("Detailed formatting and edge cases", () => {
  test("Edge cases at each scale", () => {
    expect(convert(999)).toEqual("nine hundred and ninety-nine shillings");
    expect(convert(1001)).toEqual("one thousand, one shillings");
    expect(convert(999999)).toEqual("nine hundred and ninety-nine thousand, nine hundred and ninety-nine shillings");
    expect(convert(1000001)).toEqual("one million, one shillings");
  });

  test("Mixed scales with specific linguistic quirks", () => {
    expect(convert(111)).toEqual("one hundred and eleven shillings");
    expect(convert(2111)).toEqual("two thousand, one hundred and eleven shillings");
    expect(convert(1000111)).toEqual("one million, one hundred and eleven shillings");
  });

  test("Large numbers with cents", () => {
    expect(convert(123456789.99)).toEqual("one hundred and twenty-three million, four hundred and fifty-six thousand, seven hundred and eighty-nine shillings and ninety-nine cents");
    expect(convert("9876543210.21")).toEqual("nine billion, eight hundred and seventy-six million, five hundred and forty-three thousand, two hundred and ten shillings and twenty-one cents");
  });

  test("Zero and high precision cents", () => {
    expect(convert(100.0)).toEqual("one hundred shillings");
    expect(convert(999.999)).toEqual("nine hundred and ninety-nine shillings and ninety-nine cents"); // Assuming rounding to nearest cent
  });

  test("Boundary values and special numbers", () => {
    expect(convert(Number.MAX_SAFE_INTEGER)).toEqual("nine quadrillion, seven trillion, one hundred and ninety-nine billion, two hundred and fifty-four million, seven hundred and forty thousand, nine hundred and ninety-one shillings");
    expect(convert(111111)).toEqual("one hundred and eleven thousand, one hundred and eleven shillings");
  });
});