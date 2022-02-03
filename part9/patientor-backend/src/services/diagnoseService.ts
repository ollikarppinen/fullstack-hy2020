import diagnoses from "../../data/diagnoses.json";
import { Diagnose } from "../types";

// const diagnoses: Diagnose[] = diagnoseData;

const getEntries = (): Diagnose[] => diagnoses;

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry,
};
