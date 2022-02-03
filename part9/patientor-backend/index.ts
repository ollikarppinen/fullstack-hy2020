import express from "express";
import diagnoseRouter from "./src/routes/diagnoses";
import patientRouter from "./src/routes/patients";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diagnoses", diagnoseRouter);
app.use("/api/patients", patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
