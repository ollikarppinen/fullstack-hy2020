export interface Diagnose {
  code: string;
  name: string;
  lating?: string;
}

export type Gender = "male" | "female";
export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type NonSensitivePatient = Omit<Patient, "ssn">;

export type NewPatient = Omit<Patient, "id">;
