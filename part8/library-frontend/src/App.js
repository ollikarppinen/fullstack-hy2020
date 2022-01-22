import React, { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000",
  }),
});

const query = gql`
  query AllAuthors {
    allAuthors {
      bookCount
      name
      born
    }
  }
`;

const App = () => {
  const [page, setPage] = useState("authors");
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    client.query({ query }).then((response) => {
      setAuthors(response.data.allAuthors);
    });
  });

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors authors={authors} show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
