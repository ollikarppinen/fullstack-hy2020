import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const errorMessage = useSelector(
    ({ messages: { errorMessage } }) => errorMessage
  );

  const message = useSelector(({ messages: { message } }) => message);

  return (
    <>
      {message ? <div className="success">{message}</div> : null}
      {errorMessage ? <div className="error">{errorMessage}</div> : null}
    </>
  );
};

export default Notification;
