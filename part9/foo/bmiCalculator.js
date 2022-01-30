"use strict";
var calculateBmi = function (height, weight) {
    var heightInMeters = height / 100;
    var bmi = weight / (heightInMeters * heightInMeters);
    var category = null;
    if (bmi < 16) {
        category = "Underweight (Severe thinness)";
    }
    else if (bmi < 16.9) {
        category = "Underweight (Moderate thinness)";
    }
    else if (bmi < 18.4) {
        category = "Underweight (Mild thinness)";
    }
    else if (bmi < 24.9) {
        category = "Normal range";
    }
    else if (bmi < 29.9) {
        category = "Overweight (Pre-obese)";
    }
    else if (bmi < 34.9) {
        category = "Obese (Class I)";
    }
    else if (bmi < 39.9) {
        category = "Obese (Class II)";
    }
    else {
        category = "Obese (Class III)";
    }
    console.log("BMI Category: ".concat(category));
};
try {
    var height = Number(process.argv[2]);
    var weight = Number(process.argv[3]);
    console.log(calculateBmi(height, weight));
}
catch (error) {
    var errorMessage = "Something went wrong.";
    if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
}
