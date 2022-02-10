import diagnoses from "../../data/diagnoses.json";
import { Diagnose } from "../types";

// const diagnoses: Diagnose[] = diagnoseData;

const getDiagnoses = (): Diagnose[] => diagnoses;

const addDiagnse = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnse,
};
