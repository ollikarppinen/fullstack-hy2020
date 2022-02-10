import express from "express";
import diagnoseService from "../services/diagnoseService";

const router = express.Router();

router.get("/", (_req, res) => {
  const diagnoses = diagnoseService.getDiagnoses();
  res.set("Access-Control-Allow-Origin", "*");
  console.log("someone pinged here");
  res.send(diagnoses);
});

export default router;
