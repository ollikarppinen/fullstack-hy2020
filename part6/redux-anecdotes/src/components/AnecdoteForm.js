import React from "react";
import { useDispatch } from "react-redux";

import { addAnecdote } from "../reducers/anecdoteReducer";
import anecdoteService from "../services/anecdotes";

const App = () => {
  const dispatch = useDispatch();

  const onSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(addAnecdote(newAnecdote));
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

export default App;
