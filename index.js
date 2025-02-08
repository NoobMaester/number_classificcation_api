const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Helper functions
const isPrime = (num) => {
  for (let i = 2; i <= Math.sqrt(num); i++) if (num % i === 0) return false;
  return num > 1;
};

const getFactors = (num) =>
  Array.from({ length: num }, (_, i) => i + 1).filter((n) => num % n === 0);

const isPerfect = (num) =>
  num === getFactors(num).reduce((a, b) => a + b, -num);

const isArmstrong = (num) => {
  if (num < 0) return false; // Armstrong numbers are non-negative
  const digits = num.toString().split("");
  const power = digits.length;
  const sum = digits.reduce(
    (acc, digit) => acc + Math.pow(parseInt(digit, 10), power),
    0
  );
  return num === sum;
};

const isEven = (num) => num % 2 === 0;

const digitSum = (num) =>
  num
    .toString()
    .split("")
    .reduce((a, b) => a + parseInt(b), 0);

// Fun facts database
const numberFacts = {
  0: "0 is the additive identity",
  1: "1  is also the first and second numbers in the Fibonacci sequence and is the first number in many other mathematical sequences.",
  2: "2 is the number of n-Queens Problem solutions for n = 4.",
  3: "3 is the fifth Fibonacci number and the third that is unique.",
  28: "28 is the third positive integer with a prime factorization of the form 22q where q is an odd prime.",
  42: "42 is the third pentadecagonal number.",
  69: "69 is a value of n where n2 and n3 together contain each digit once.",
  371: "371 is a narcissistic number.",
};

app.get("/api/classify-number", (req, res) => {
  const input = req.query.number;

  // check if input is missing
  if (input === undefined || input.trim() === "") {
    return res.status(400).json({
      number: input,
      error: true,
    });
  }
  //convert input to number
  const num = Number(input);

  //convert negative numbers to positive
  const absoluteNum = Math.abs(num);

  // Check if input is a valid number, not a float, or negative
  if (isNaN(num) || !Number.isInteger(num)) {
    return res.status(400).json({
      number: input,
      error: true,
    });
  }

  const response = {
    number: num,
    is_prime: isPrime(num),
    is_perfect: isPerfect(absoluteNum),
    properties: [
      isArmstrong(absoluteNum) ? "armstrong" : null,
      isEven(absoluteNum) ? "even" : "odd",
    ].filter(Boolean),
    digit_sum: digitSum(absoluteNum), //sum of digits
    fun_fact:
      numberFacts[absoluteNum] ||
      "No fun fact found for this number in our database yet.", //gotten from the numbers API
  };

  res.json(response);
});

app.listen(port, () =>
  console.log(`Number classification API running on port ${port}`)
);
