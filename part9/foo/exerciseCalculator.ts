enum Rating {
  A = 1,
  B = 2,
  C = 3,
}

enum RatingLabel {
  A = "that was poor",
  B = "not too bad but could be better",
  C = "great job",
}

interface ResultoObject {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  hours: number[],
  target: number
): ResultoObject => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((i) => i > 0).length;
  const average = hours.reduce((sum, i) => sum + i, 0) / periodLength;
  const success = average > target;
  const rating =
    average === 0 ? Rating.A : average < target ? Rating.B : Rating.C;
  const ratingDescription =
    rating === Rating.A
      ? RatingLabel.A
      : Rating.B
      ? RatingLabel.B
      : RatingLabel.C;
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

// try {
//   const [_cmd1, _cmd2, targetArg, ...hoursArg] = process.argv;
//   const target: number = Number(targetArg);
//   const hours: number[] = hoursArg.map((i) => Number(i));
//   console.log(calculateExercises(hours, target));
// } catch (error: unknown) {
//   let errorMessage = "Something went wrong.";
//   if (error instanceof Error) {
//     errorMessage += " Error: " + error.message;
//   }
//   console.log(errorMessage);
// }
