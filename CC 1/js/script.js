/*
Mark and John are trying to compare their BMI (Body Mass Index), which is 
calculated using the formula:
BMI = mass / height ** 2 = mass / (height * height) (mass in kg 
and height in meter).

Your tasks:
1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both 
versions)
3. Create a Boolean variable 'markHigherBMI' containing information about 
whether Mark has a higher BMI than John.

Test data:
 Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
 Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76 m tall.
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

//BMI confrontation and console log
const markHigherBMI = BMIMark > BMIJhon;
console.log(BMIMark, BMIJhon, markHigherBMI);
