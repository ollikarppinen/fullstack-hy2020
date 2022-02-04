import React, { useEffect } from "react";
import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Container, Icon, SemanticICONS } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Gender, Patient } from "../types";

const PatientShowPage = () => {
  const { id }: { id?: string | undefined } = useParams();
  const [{ patients }, dispatch] = useStateValue();

  if (!id) return null;

  const patient: Patient | undefined = patients[id];
  const { name, gender, ssn, occupation, dateOfBirth } = patient || {};

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch({ type: "ADD_PATIENT", payload: patientFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    if (!ssn) void fetchPatient();
  }, [ssn, dispatch]);

  let iconName: SemanticICONS;
  switch (gender) {
    case Gender.Female:
      iconName = "venus";
      break;
    case Gender.Male:
      iconName = "mars";
      break;
    default:
      iconName = "genderless";
  }

  return (
    <div className="App">
      <Container>
        <h2>
          {name} <Icon name={iconName} />
        </h2>
        <div>ssn: {ssn}</div>
        <div>occupation: {occupation}</div>
        <div>dateOfBirth: {dateOfBirth}</div>
      </Container>
    </div>
  );
};

export default PatientShowPage;
