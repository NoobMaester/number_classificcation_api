const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


// Helper functions
const isPrime = num => {
  for(let i = 2; i <= Math.sqrt(num); i++) if(num % i === 0) return false;
  return num > 1;
};

const getFactors = num => 
  Array.from({length: num}, (_, i) => i + 1).filter(n => num % n === 0);

const isPerfect = num => 
  num === getFactors(num).reduce((a, b) => a + b, -num);

const isArmstrong = (num) => {
  if (num < 0) return false; // Armstrong numbers are non-negative
  const digits = num.toString().split('');
  const power = digits.length;
  const sum = digits.reduce((acc, digit) => 
    acc + Math.pow(parseInt(digit, 10), power), 0
  );
  return num === sum;
};

const isOdd = num => num % 2 !== 0;

const isEven = num => num % 2 === 0;

const digitSum = num => num.toString().split('').reduce((a, b) => a + parseInt(b), 0);

// Fun facts database
const numberFacts = {
  0: "Zero is the additive identity",
  1: "One  is also the first and second numbers in the Fibonacci sequence and is the first number in many other mathematical sequences.",
  2: "Two is the number of n-Queens Problem solutions for n = 4.",
  3: "Three is the fifth Fibonacci number and the third that is unique.",
  28: "Twenty-eight is the third positive integer with a prime factorization of the form 22q where q is an odd prime.",
  42: "Forty-two is the third pentadecagonal number.",
  69: "Sixty-nine is a value of n where n2 and n3 together contain each digit once.",
  317: "Three hundred seventeen is the number of binary 4x4 matrices up to permutations of rows and columns."
};

app.get('/api/:number', (req, res) => {
  const number = parseInt(req.params.number);
  
  if(isNaN(number)) {
    return res.status(400).json({ error: "Please provide a valid number" });
  }

  const response = {
    number: number,
    is_prime: isPrime(number),
    is_perfect: isPerfect(number),
    properties:[isArmstrong(number), isOdd(number), isEven(number)],
    digit_sum: digitSum(number),
    funFact: numberFacts[number] || "No fun fact found for this number."
  };

  res.json(response);
});

app.listen(port, () => console.log(`Number Explorer API running on port ${port}`));