declare enum Rating {
    A = 1,
    B = 2,
    C = 3
}
declare enum RatingLabel {
    A = "that was poor",
    B = "not too bad but could be better",
    C = "great job"
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
declare const calculateExercises: (hours: number[], target: number) => ResultoObject;
