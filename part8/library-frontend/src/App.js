import React, { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState("authors");
  const [error, setError] = useState("error");

  useEffect(() => {
    if (token && page == "login") setPage("books");
  }, [token]);

  const client = useApolloClient();
  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <button onClick={() => setPage("add")}>add book</button>
        ) : null}
        {!token ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : null}
        {token ? <button onClick={logout}>logout</button> : null}
      </div>

      <LoginForm
        setError={setError}
        setToken={setToken}
        show={page === "login"}
      />

      <Authors token={token} show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
