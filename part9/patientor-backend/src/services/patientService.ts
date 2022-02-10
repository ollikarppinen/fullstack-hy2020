import { v4 as uuidv4 } from "uuid";

import patientData from "../../data/patients.json";
import { Patient, NonSensitivePatient, NewPatient, Entry } from "../types";
import { toNewPatient, parseEntry, EntryFields } from "../utils";

const patients: Patient[] = patientData.map(({ id, ...obj }) => {
  return {
    id,
    ...toNewPatient(obj),
  };
});

const getPatients = (): Patient[] => patients;

const findPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  return patient;
};

const addEntry = (patient: Patient, entry: EntryFields): Entry => {
  const newEntry: Entry = parseEntry({ ...entry, id: uuidv4() });
  const { entries = [] } = patient;
  const newEntries = [...entries, newEntry];
  updatePatient({ ...patient, entries: newEntries });
  return newEntry;
};

const getNonSensitivePatients = (): NonSensitivePatient[] =>
  patients.map(({ ssn, ...patient }) => patient);

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

export const updatePatient = (patient: Patient): Patient => {
  const patientIndex = patients.findIndex(({ id }) => patient.id === id);
  if (patientIndex === -1) throw new Error("patient not found");
  patients[patientIndex] = patient;
  return patient;
};

export default {
  getPatients,
  addPatient,
  getNonSensitivePatients,
  findPatientById,
  addEntry,
};
