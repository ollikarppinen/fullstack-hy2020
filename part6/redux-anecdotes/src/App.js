import React from "react";

import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";

const App = () => (
  <div>
    <Notification />
    <AnecdoteList />
    <AnecdoteForm />
  </div>
);

export default App;
