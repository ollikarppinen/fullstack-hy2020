import express from "express";
import patientService from "../services/patientService";
import { toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = patientService.getNonSensitivePatients();
  res.send(patients);
});

router.post("/:id/entries", (req, res) => {
  const patient = patientService.findPatientById(String(req.params.id));
  if (!patient) return res.sendStatus(404);
  try {
    const newEntry = patientService.addEntry(patient, req.body);
    return res.send(newEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    return res.status(400).send(errorMessage);
  }
});

router.get("/:id", (req, res) => {
  const patient = patientService.findPatientById(String(req.params.id));
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = patientService.addPatient(toNewPatient(req.body));
    res.json(newPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
