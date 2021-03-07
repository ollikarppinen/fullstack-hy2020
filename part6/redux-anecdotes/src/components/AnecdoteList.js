import React from "react";
import { connect } from "react-redux";

import { updateAnecdote } from "../reducers/anecdoteReducer";
import Notification from "./Notification";
import { setNotification } from "../reducers/notificationReducer";
import Filter from "./Filter";

export const AnecdoteList = ({
  anecdotes,
  updateAnecdote,
  setNotification,
}) => {
  const onVote = (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    updateAnecdote(updatedAnecdote);
    setNotification(`you voted '${anecdote.content}'`, 3);
  };

  return (
    <>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => onVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

const mapStateToProps = (state) => {
  const { filter, anecdotes } = state;
  return {
    anecdotes: filter
      ? anecdotes.filter((anecdote) => anecdote.content.includes(filter))
      : anecdotes,
  };
};

const mapDispatchToProps = {
  updateAnecdote,
  setNotification,
};

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);

export default ConnectedAnecdoteList;
