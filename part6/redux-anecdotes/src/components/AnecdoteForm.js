import React from "react";
import { useDispatch } from "react-redux";

import { createAnecdote } from "../reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  const onSubmit = async (event) => {
    event.preventDefault();
    dispatch(createAnecdote(event.target.content.value));
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
