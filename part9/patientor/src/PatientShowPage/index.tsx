import React, { useEffect } from "react";
import axios from "axios";

import { apiBaseUrl } from "../constants";
import {
  Container,
  Icon,
  SemanticICONS,
  Card,
  Feed,
  Button,
  SemanticCOLORS,
} from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import {
  Gender,
  Patient,
  EntryType,
  Discharge,
  SickLeave,
  HealthCheckRating,
  Entry,
} from "../types";
import { addPatient } from "../state/reducer";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientShowPage = () => {
  const { id }: { id?: string | undefined } = useParams();
  const [{ patients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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

  const submitNewEntry = async (values: EntryFormValues) => {
    console.log("submitNewEntry", values);
    try {
      // const { data: newEntry } = await axios.post<Entry>(
      await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, values);
      // dispatch(addPatient(newPatient));
      closeModal();
    } catch (e: any) {
      console.error(e.response?.data || "Unknown Error");
      setError(e.response?.data?.error || "Unknown error");
    }
  };

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
          <Feed>{entries.map(EntryFeedEvent)}</Feed>
        </Card>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add New Entry</Button>
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
  healthCheckRating?: HealthCheckRating;
}

const EntryFeedEvent = (props: EntryProps) => {
  const { type } = props;
  switch (type) {
    case EntryType.Hospital:
      return <HospitalEntryFeedEvent {...props} />;
    case EntryType.OccupationalHealthcare:
      return <OccupationalHealthcareEntryFeedEvent {...props} />;
    case EntryType.HealthCheck:
      return <HealthCheckEntryFeedEvent {...props} />;
    default:
      return <UnknownEntryFeedEvent {...props} />;
  }
};

const HospitalEntryFeedEvent = ({
  id,
  date,
  diagnosisCodes,
  description,
  discharge,
}: EntryProps) => {
  return (
    <Feed.Event key={id}>
      <Feed.Label>
        <Icon name="hospital" />
      </Feed.Label>
      <Feed.Content>
        {diagnosisCodes.map(DiagnoseFeedSummary)}
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

const OccupationalHealthcareEntryFeedEvent = ({
  id,
  date,
  diagnosisCodes,
  description,
  sickLeave,
}: EntryProps) => {
  return (
    <Feed.Event key={id}>
      <Feed.Label>
        <Icon name="briefcase" />
      </Feed.Label>
      <Feed.Content>
        {diagnosisCodes.map(DiagnoseFeedSummary)}
        <Feed.Date>{date}</Feed.Date>
        <Feed.Extra text>{description}</Feed.Extra>
        <Feed.Extra text>Start date: {sickLeave?.startDate}</Feed.Extra>
        <Feed.Extra text>End date: {sickLeave?.endDate}</Feed.Extra>
      </Feed.Content>
    </Feed.Event>
  );
};

const HealthCheckEntryFeedEvent = ({
  id,
  date,
  diagnosisCodes,
  description,
  healthCheckRating,
}: EntryProps) => {
  let iconColor: SemanticCOLORS = "grey";
  switch (healthCheckRating) {
    case HealthCheckRating.LowRisk:
      iconColor = "yellow";
      break;
    case HealthCheckRating.HighRisk:
      iconColor = "orange";
      break;
    case HealthCheckRating.Healthy:
      iconColor = "green";
      break;
    case HealthCheckRating.CriticalRisk:
      iconColor = "red";
      break;
  }
  return (
    <Feed.Event key={id}>
      <Feed.Label>
        <Icon name="check" />
      </Feed.Label>
      <Feed.Content>
        {diagnosisCodes.map(DiagnoseFeedSummary)}
        <Feed.Date>{date}</Feed.Date>
        <Feed.Extra text>{description}</Feed.Extra>
        <Feed.Meta>
          <Feed.Like>
            <Icon name="like" color={iconColor} />
          </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  );
};

const UnknownEntryFeedEvent = ({
  id,
  date,
  diagnosisCodes,
  description,
}: EntryProps) => {
  return (
    <Feed.Event key={id}>
      <Feed.Label>
        <Icon name="question" />
      </Feed.Label>
      <Feed.Content>
        {diagnosisCodes.map(DiagnoseFeedSummary)}
        <Feed.Date>{date}</Feed.Date>
        <Feed.Extra text>{description}</Feed.Extra>
      </Feed.Content>
    </Feed.Event>
  );
};

const DiagnoseFeedSummary = (code: string) => {
  const [{ diagnosis }] = useStateValue();

  const name = diagnosis[code]?.name;
  return <Feed.Summary key={code}>{name}</Feed.Summary>;
};

export default PatientShowPage;
