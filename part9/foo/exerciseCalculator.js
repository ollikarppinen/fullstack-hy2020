"use strict";
var Rating;
(function (Rating) {
    Rating[Rating["A"] = 1] = "A";
    Rating[Rating["B"] = 2] = "B";
    Rating[Rating["C"] = 3] = "C";
})(Rating || (Rating = {}));
var RatingLabel;
(function (RatingLabel) {
    RatingLabel["A"] = "that was poor";
    RatingLabel["B"] = "not too bad but could be better";
    RatingLabel["C"] = "great job";
})(RatingLabel || (RatingLabel = {}));
var calculateExercises = function (hours, target) {
    var periodLength = hours.length;
    var trainingDays = hours.filter(function (i) { return i > 0; }).length;
    var average = hours.reduce(function (sum, i) { return sum + i; }, 0) / periodLength;
    var success = average > target;
    var rating = average === 0 ? Rating.A : average < target ? Rating.B : Rating.C;
    var ratingDescription = rating === Rating.A
        ? RatingLabel.A
        : Rating.B
            ? RatingLabel.B
            : RatingLabel.C;
    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    };
};
try {
    var _a = process.argv, _cmd1 = _a[0], _cmd2 = _a[1], targetArg = _a[2], hoursArg = _a.slice(3);
    var target = Number(targetArg);
    var hours = hoursArg.map(function (i) { return Number(i); });
    console.log(calculateExercises(hours, target));
}
catch (error) {
    var errorMessage = "Something went wrong.";
    if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
}
