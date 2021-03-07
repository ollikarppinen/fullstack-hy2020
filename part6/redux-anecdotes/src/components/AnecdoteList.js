import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateAnecdote } from "../reducers/anecdoteReducer";
import Notification from "./Notification";
import { setNotification } from "../reducers/notificationReducer";
import Filter from "./Filter";

const App = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const onVote = (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    dispatch(updateAnecdote(updatedAnecdote));
    dispatch(setNotification(`you voted '${anecdote.content}'`, 3));
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
