import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = patientService.getNonSensitiveEntries();
  //   res.set("Access-Control-Allow-Origin", "*");
  res.send(patients);
});

router.post("/", (req, res) => {
  //   res.set("Access-Control-Allow-Origin", "*");
  const { name, dateOfBirth, gender, occupation, ssn } = req.body;
  const newPatient = patientService.addEntry({
    name,
    dateOfBirth,
    gender,
    occupation,
    ssn,
  });
  res.json(newPatient);
});

export default router;
