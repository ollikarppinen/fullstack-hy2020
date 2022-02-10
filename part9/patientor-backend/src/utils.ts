import {
  NewPatient,
  Gender,
  Entry,
  EntryType,
  SickLeave,
  Discharge,
  HealthCheckRating,
} from "./types";

type PatientFields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries?: unknown;
};

export const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries,
}: PatientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(entries),
  };

  return newPatient;
};

export type EntryFields = {
  id: unknown;
  date: unknown;
  type: unknown;
  specialist: unknown;
  diagnosisCodes: unknown;
  description: unknown;
  employerName?: unknown;
  sickLeave: unknown;
  discharge: unknown;
  healthCheckRating: unknown;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries) return [];
  if (!Array.isArray(entries)) throw new Error("Incorrect or missing entries");
  return entries.map(parseEntry);
};

export const parseEntry = ({
  id,
  date,
  type,
  specialist,
  diagnosisCodes,
  description,
  employerName,
  sickLeave,
  discharge,
  healthCheckRating,
}: EntryFields): Entry => {
  const entryType = parseEntryType(type);

  switch (entryType) {
    case EntryType.Hospital:
      console.log("EntryType.Hospital");
      return {
        id: parseString(id),
        date: parseDate(date),
        type: EntryType.Hospital,
        specialist: parseString(specialist),
        diagnosisCodes: parseStringArray(diagnosisCodes),
        description: parseString(description),
        discharge: parseDischarge(discharge),
      };
    case EntryType.OccupationalHealthcare:
      return {
        id: parseString(id),
        date: parseDate(date),
        type: EntryType.OccupationalHealthcare,
        specialist: parseString(specialist),
        diagnosisCodes: parseStringArray(diagnosisCodes),
        description: parseString(description),
        employerName: parseString(employerName),
        sickLeave: parseSickLeave(sickLeave),
      };
    case EntryType.HealthCheck:
      return {
        id: parseString(id),
        date: parseDate(date),
        type: EntryType.HealthCheck,
        specialist: parseString(specialist),
        diagnosisCodes: parseStringArray(diagnosisCodes),
        description: parseString(description),
        healthCheckRating: parseHealthCheckRating(healthCheckRating),
      };
    default:
      throw new Error("Incorrect or missing entry type");
  }
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!isHealthCheckRating(healthCheckRating)) {
    throw new Error(
      "Incorrect or missing healthCheckRating: " + healthCheckRating
    );
  }
  return healthCheckRating;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseSickLeave = ({ startDate, endDate }: any): SickLeave => {
  return {
    startDate: parseDate(startDate),
    endDate: parseDate(endDate),
  };
};

const parseDischarge = ({ date, criteria }: any): Discharge => {
  return {
    date: parseDate(date),
    criteria: parseString(criteria),
  };
};

const parseString = (string: unknown): string => {
  if (!string || !isString(string)) {
    throw new Error("Incorrect or missing string");
  }

  return string;
};

const parseStringArray = (array: unknown): string[] => {
  if (!array || !Array.isArray(array))
    throw new Error("Incorrect or missing string array");

  return array.map(parseString);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }

  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseEntryType = (type: unknown): EntryType => {
  if (!type || !isEntryType(type)) {
    throw new Error("Incorrect or missing type: " + type);
  }
  return type;
};

const isEntryType = (type: any): type is EntryType =>
  Object.values(EntryType).includes(type);

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }

  return occupation;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
