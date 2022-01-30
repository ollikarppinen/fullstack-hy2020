import express from "express";
import bodyParser from "body-parser";

import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

var jsonParser = bodyParser.json();

app.get("/hello", (req, res) => {
  console.log("res.query", req.query);
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  let height, weight;
  try {
    height = Number(req.query.height);
    weight = Number(req.query.weight);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
    res.status(400);
    return res.send({ error: "malformatted parameters" });
  }
  const bmi = calculateBmi(height, weight);
  return res.send({ weight, height, bmi });
});

app.post("/exercises", jsonParser, (req, res) => {
  let hours, target;

  if (
    !req.body.hasOwnProperty("target") ||
    !req.body.hasOwnProperty("daily_exercises")
  ) {
    res.status(400);
    return res.send({ error: "parameters missing" });
  }
  try {
    hours = req.body.daily_exercises.map((i: string) => parseInt(i));
    target = parseInt(req.body.target);

    if (
      isNaN(target) ||
      hours.reduce((bool: boolean, el: number) => bool || isNaN(el), false)
    ) {
      throw "Parameter is not a number!";
    }
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
    res.status(400);
    return res.send({ error: "malformatted parameters" });
  }
  const result = calculateExercises(hours, target);
  return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
