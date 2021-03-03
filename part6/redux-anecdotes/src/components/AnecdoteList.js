import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { voteAnecdote } from "../reducers/anecdoteReducer";
import Notification from "./Notification";
import { notify, hideNotification } from "../reducers/notificationReducer";

const App = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();

  const onVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id));
    dispatch(notify(`you voted '${anecdote.content}'`));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
  };

  return (
    <>
      <h2>Anecdotes</h2>
      <Notification />
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

export default App;
