import { v4 as uuidv4 } from "uuid";

import patientData from "../../data/patients.json";
import { Patient, NonSensitivePatient, NewPatient } from "../types";
import toNewPatient from "../utils";

const patients: Patient[] = patientData.map(({ id, ...obj }) => {
  return {
    id,
    ...toNewPatient(obj),
  };
});

const getEntries = (): Patient[] => patients;

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  return patient;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] =>
  patients.map(({ ssn, ...patient }) => patient);

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
  findById,
};
