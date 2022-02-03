import patients from "../../data/patients.json";
import { Patient, NonSensitivePatient } from "../types";

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

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry,
  getNonSensitiveEntries,
};
