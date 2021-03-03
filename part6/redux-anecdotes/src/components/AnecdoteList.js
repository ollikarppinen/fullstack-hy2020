import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { voteAnecdote } from "../reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(voteAnecdote(anecdote.id))}>
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default App;
