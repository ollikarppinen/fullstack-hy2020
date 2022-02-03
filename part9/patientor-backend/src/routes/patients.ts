import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = patientService.getNonSensitiveEntries();
  res.set("Access-Control-Allow-Origin", "*");
  res.send(patients);
});

export default router;
