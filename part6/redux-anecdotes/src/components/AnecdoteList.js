import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { voteAnecdote } from "../reducers/anecdoteReducer";
import Notification from "./Notification";
import { notify, hideNotification } from "../reducers/notificationReducer";
import Filter from "./Filter";

const App = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const onVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id));
    dispatch(notify(`you voted '${anecdote.content}'`));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
  };

  const filteredAnecdotes = filter
    ? anecdotes.filter((anecdote) => anecdote.content.includes(filter))
    : anecdotes;

  return (
    <>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      {filteredAnecdotes.map((anecdote) => (
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
