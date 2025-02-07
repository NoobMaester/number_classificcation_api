**Number Classification API** 
a RESTful service that provides detailed mathematical properties, classifications, and fun facts about any positive integer. It’s built with Node.js and Express.js

**Endpoint** *GET /api/classify-number?number=<integer>* **number** (required): A positive integer to classify.

**Example Request** *curl "http://localhost:3000/api/classify-number?number=28"*

**Example Response** 
**(200 OK)**

*{
  "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["armstrong", "odd"],
    "digit_sum": 11,  // sum of its digits
    "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371" //gotten from the numbers API
}*

**(400 Bad request for invalid inputs such as non-integers, missing number, )**

*{
    "number": "alphabet",
    "error": true
}*
