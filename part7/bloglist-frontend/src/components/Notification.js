import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = () => {
  const errorMessage = useSelector(
    ({ messages: { errorMessage } }) => errorMessage
  );

  const message = useSelector(({ messages: { message } }) => message);

  return (
    <>
      {message ? <Alert variant="success">{message}</Alert> : null}
      {errorMessage ? <Alert variant="danger">{errorMessage}</Alert> : null}
    </>
  );
};

export default Notification;
