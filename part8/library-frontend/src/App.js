import React, { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

import { gql, useQuery } from "@apollo/client";

const ALL_AUTHORS = gql`
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
  const authorQueryResult = useQuery(ALL_AUTHORS);
  const authors = authorQueryResult.loading
    ? []
    : authorQueryResult.data.allAuthors;

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
