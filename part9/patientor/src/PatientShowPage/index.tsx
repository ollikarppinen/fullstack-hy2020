import React, { useEffect } from "react";
import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Container, Icon, SemanticICONS, Card, Feed } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Gender, Patient, EntryType, Discharge, SickLeave } from "../types";
import { addPatient } from "../state/reducer";

const PatientShowPage = () => {
  const { id }: { id?: string | undefined } = useParams();
  const [{ patients }, dispatch] = useStateValue();

  if (!id) return null;

  const patient: Patient | undefined = patients[id];
  const {
    name,
    gender,
    ssn,
    occupation,
    dateOfBirth,
    entries = [],
  } = patient || {};

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(addPatient(patientFromApi));
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
        <Card>
          <Card.Content>
            <Card.Header>entries</Card.Header>
          </Card.Content>
          <Feed>{entries.map(Entry)}</Feed>
        </Card>
      </Container>
    </div>
  );
};

interface EntryProps {
  id: string;
  date: string;
  description: string;
  diagnosisCodes: string[];
  type: EntryType;
  discharge?: Discharge;
  sickLeave?: SickLeave;
}

const Entry = (props: EntryProps) => {
  const { type } = props;
  switch (type) {
    case EntryType.Hospital:
      return <HospitalEntry {...props} />;
    case EntryType.OccupationalHealthcare:
      return <OccupationalHealthcareEntry {...props} />;
    default:
      return <UnknownEntry {...props} />;
  }
};

const HospitalEntry = ({
  id,
  date,
  diagnosisCodes,
  description,
  discharge,
}: EntryProps) => {
  console.log("DISCHARGE", discharge);
  return (
    <Feed.Event key={id}>
      <Feed.Label>
        <Icon name="stethoscope" />
      </Feed.Label>
      <Feed.Content>
        {diagnosisCodes.map(Diagnose)}
        <Feed.Date>{date}</Feed.Date>
        <Feed.Extra text>{description}</Feed.Extra>
        <Feed.Extra text>
          <strong>Discharge</strong>
          {discharge?.criteria}
          <Feed.Date>{discharge?.date}</Feed.Date>
        </Feed.Extra>
      </Feed.Content>
    </Feed.Event>
  );
};

const OccupationalHealthcareEntry = ({
  id,
  date,
  diagnosisCodes,
  description,
  sickLeave,
}: EntryProps) => {
  return (
    <Feed.Event key={id}>
      <Feed.Label>
        <Icon name="doctor" />
      </Feed.Label>
      <Feed.Content>
        {diagnosisCodes.map(Diagnose)}
        <Feed.Date>{date}</Feed.Date>
        <Feed.Extra text>{description}</Feed.Extra>
        <Feed.Extra text>Start date: {sickLeave?.startDate}</Feed.Extra>
        <Feed.Extra text>End date: {sickLeave?.endDate}</Feed.Extra>
      </Feed.Content>
    </Feed.Event>
  );
};

const UnknownEntry = ({
  id,
  date,
  diagnosisCodes,
  description,
}: EntryProps) => {
  return (
    <Feed.Event key={id}>
      <Feed.Label>
        <Icon name="question circle outline" />
      </Feed.Label>
      <Feed.Content>
        {diagnosisCodes.map(Diagnose)}
        <Feed.Date>{date}</Feed.Date>
        <Feed.Extra text>{description}</Feed.Extra>
      </Feed.Content>
    </Feed.Event>
  );
};

const Diagnose = (code: string) => {
  const [{ diagnosis }] = useStateValue();

  const name = diagnosis[code]?.name;
  return <Feed.Summary key={code}>{name}</Feed.Summary>;
};

export default PatientShowPage;
