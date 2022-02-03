import { v4 as uuidv4 } from "uuid";

import patients from "../../data/patients.json";
import { Patient, NonSensitivePatient, NewPatient } from "../types";

const getEntries = (): Patient[] => patients;

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addEntry = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  addEntry,
  getNonSensitiveEntries,
};
