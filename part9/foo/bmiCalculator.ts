const calculateBmi = (height: number, weight: number) => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  let category = null;
  if (bmi < 16) {
    category = "Underweight (Severe thinness)";
  } else if (bmi < 16.9) {
    category = "Underweight (Moderate thinness)";
  } else if (bmi < 18.4) {
    category = "Underweight (Mild thinness)";
  } else if (bmi < 24.9) {
    category = "Normal range";
  } else if (bmi < 29.9) {
    category = "Overweight (Pre-obese)";
  } else if (bmi < 34.9) {
    category = "Obese (Class I)";
  } else if (bmi < 39.9) {
    category = "Obese (Class II)";
  } else {
    category = "Obese (Class III)";
  }

  console.log(`BMI Category: ${category}`);
};

try {
  const height: number = Number(process.argv[2]);
  const weight: number = Number(process.argv[3]);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something went wrong.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
