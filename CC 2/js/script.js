/*

Use the BMI example from Challenge #1, and the code you already wrote, and 
improve it.

Your tasks:
1. Print a nice output to the console, saying who has the higher BMI. The message 
is either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"

2. Use a template literal to include the BMI values in the outputs. Example: "Mark's
BMI (28.3) is higher than John's (23.9)!"

Hint: Use an if/else statement 

*/

// mark's data
const massMark = 78;
const heightMark = 1.69;

//Jhon's data
const massJhon = 92;
const heightJhon = 1.95;

//Mark's BMI calculation
const BMIMark = massMark / heightMark ** 2; //l'operatore ** è l'elevazione a potenza

//Jhon's BMI calculation
const BMIJhon = massJhon / (heightJhon * heightJhon);

//BMI confrontation
const markHigherBMI = BMIMark > BMIJhon;

// if/else condition
if (BMIMark > BMIJhon) {
  console.log(`Mark\'s BMI (${BMIMark}) is higher than Jhon\'s (${BMIJhon})`);
} else {
  console.log(`Jhon\'s BMI (${BMIJhon}) is higher than Mark\'s (${BMIMark})`);
}
