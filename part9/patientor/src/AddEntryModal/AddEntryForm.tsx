import React from "react";
import { Grid, Button } from "semantic-ui-react";
import {
  Field,
  Formik,
  Form,
  useFormikContext,
  FormikContextType,
} from "formik";

import {
  TextField,
  SelectField,
  EntryTypeOption,
  DiagnosisSelection,
  NumberField,
} from "./FormField";
import { EntryType, Discharge, SickLeave, HealthCheckRating } from "../types";
import { useStateValue } from "../state";

export interface EntryFormValues {
  date: string;
  type: EntryType;
  specialist: string;
  diagnosisCodes: string[];
  description: string;
  discharge: Discharge;
  employerName: string;
  sickLeave: SickLeave;
  healthCheckRating: HealthCheckRating;
}

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.OccupationalHealthcare, label: "OccupationalHealthcare" },
  { value: EntryType.HealthCheck, label: "HealthCheck" },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Formik
      initialValues={{
        date: "",
        type: EntryType.Hospital,
        specialist: "",
        diagnosisCodes: [],
        description: "",
        discharge: {
          date: "",
          criteria: "",
        },
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: "",
        },
        healthCheckRating: 0,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const invalidDateError = "Invalid date";
        const errors: {
          [field: string]: string | { [field: string]: string };
        } = {};
        console.log("VALUES", values);
        if (!values.date) {
          errors.date = requiredError;
        } else if (!isValidDate(values.date)) {
          errors.date = invalidDateError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        switch (values.type) {
          case EntryType.Hospital:
            errors.discharge = {};
            if (!values.discharge.date) {
              errors.discharge.date = requiredError;
            } else if (!isValidDate(values.discharge.date)) {
              errors.discharge.date = invalidDateError;
            }
            if (!values.discharge.criteria) {
              errors.discharge.criteria = requiredError;
            }
            break;
          case EntryType.HealthCheck:
            if (!values.healthCheckRating) {
              errors.healthCheckRating = requiredError;
            }
            break;
          case EntryType.OccupationalHealthcare:
            errors.sickLeave = {};
            if (!values.sickLeave.startDate) {
              errors.sickLeave.startDate = requiredError;
            } else if (!isValidDate(values.sickLeave.startDate)) {
              errors.sickLeave.startDate = invalidDateError;
            }
            if (!values.sickLeave.endDate) {
              errors.sickLeave.endDate = requiredError;
            } else if (!isValidDate(values.sickLeave.endDate)) {
              errors.sickLeave.endDate = invalidDateError;
            }
            if (!values.employerName) {
              errors.employerName = requiredError;
            }
            break;
          default:
            errors.type = "Unknown type";
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            <SelectField
              label="Entry type"
              name="type"
              options={entryTypeOptions}
            />
            <HospitalEntryFields />
            <HealthCheckEntryFields />
            <OccupationalHealthcareEntryFields />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

const HospitalEntryFields = () => {
  const formikContext: FormikContextType<EntryFormValues> = useFormikContext();
  const values: EntryFormValues = formikContext.values;
  const entryType = values.type;
  return entryType === EntryType.Hospital ? (
    <>
      <Field
        label="Discharge date"
        placeholder="YYYY-MM-DD"
        name="discharge.date"
        component={TextField}
      />
      <Field
        label="Discharge criteria"
        placeholder="criteria"
        name="discharge.criteria"
        component={TextField}
      />
    </>
  ) : null;
};
const HealthCheckEntryFields = () => {
  const formikContext: FormikContextType<EntryFormValues> = useFormikContext();
  const values: EntryFormValues = formikContext.values;
  const entryType = values.type;
  return entryType === EntryType.HealthCheck ? (
    <>
      <Field
        label="healthCheckRating"
        name="healthCheckRating"
        component={NumberField}
        min={0}
        max={3}
      />
    </>
  ) : null;
};
const OccupationalHealthcareEntryFields = () => {
  const formikContext: FormikContextType<EntryFormValues> = useFormikContext();
  const values: EntryFormValues = formikContext.values;
  const entryType = values.type;
  return entryType === EntryType.OccupationalHealthcare ? (
    <>
      <Field
        label="Employer name"
        placeholder="Employer name"
        name="employerName"
        component={TextField}
      />
      <Field
        label="Sick leave start date"
        placeholder="YYYY-MM-DD"
        name="sickLeave.startDate"
        component={TextField}
      />
      <Field
        label="Sick leave end date"
        placeholder="YYYY-MM-DD"
        name="sickLeave.endDate"
        component={TextField}
      />
    </>
  ) : null;
};

const isValidDate = (date: string): boolean =>
  /^\d{4}-\d{1,2}-\d{1,2}$/.test(date);

export default AddEntryForm;
