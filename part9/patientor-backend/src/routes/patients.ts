import express from "express";
import patientService from "../services/patientService";
import toNewPatient from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = patientService.getNonSensitiveEntries();
  res.send(patients);
});

router.post("/", (req, res) => {
  try {
    // const { name, dateOfBirth, gender, occupation, ssn } = req.body;
    // const newPatient = patientService.addEntry({
    //   name,
    //   dateOfBirth,
    //   gender,
    //   occupation,
    //   ssn,
    // });
    const newPatient = toNewPatient(req.body);
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
