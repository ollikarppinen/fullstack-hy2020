import React from "react";
import { connect } from "react-redux";

import { createAnecdote } from "../reducers/anecdoteReducer";

export const AnecdoteForm = ({ createAnecdote }) => {
  const onSubmit = async (event) => {
    event.preventDefault();
    createAnecdote(event.target.content.value);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={onSubmit}>
        <div>
          <input name="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

const mapDispatchToProps = { createAnecdote };

const ConnectedAnecdoteForm = connect(() => {}, mapDispatchToProps)(
  AnecdoteForm
);

export default ConnectedAnecdoteForm;
