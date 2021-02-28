import React from "react";
import { useDispatch } from "react-redux";

import { addAnecdote } from "../reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    dispatch(addAnecdote(content));
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input name="content" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default App;
