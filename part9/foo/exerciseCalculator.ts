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

const calculateExercises = (hours: number[], target: number): ResultoObject => {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
