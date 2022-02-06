export interface Diagnose {
  code: string;
  name: string;
  lating?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export enum EntryType {
  Hospital = "Hospital",
  OccupationalHealthcare = "OccupationalHealthcare",
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface BaseEntry {
  id: string;
  date: string;
  type: EntryType;
  specialist: string;
  diagnosisCodes: string[];
  description: string;
}

export interface OccupationalHealthCareEntry extends BaseEntry {
  employerName: string;
  sickLeave: SickLeave;
}
export interface HospitalEntry extends BaseEntry {
  discharge: Discharge;
}

export type Entry = OccupationalHealthCareEntry | HospitalEntry;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type PublicPatient = Omit<Patient, "ssn" | "entries">;

export type NonSensitivePatient = Omit<Patient, "ssn">;

export type NewPatient = Omit<Patient, "id">;
