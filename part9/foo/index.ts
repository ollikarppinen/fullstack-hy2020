import express from "express";

import { calculateBmi } from "./bmiCalculator";

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
