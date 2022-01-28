import React, { useState, useEffect } from "react";
import { useApolloClient, useLazyQuery, useSubscription } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import RecommendedBooks from "./components/RecommendedBooks";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { ME, BOOK_ADDED, ALL_BOOKS } from "./queries";

const App = () => {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState("authors");
  const [error, setError] = useState("error");

  const [makeMeQuery, meQueryResult] = useLazyQuery(ME);

  useEffect(() => {
    if (token) makeMeQuery();
  }, [token, makeMeQuery]);

  useEffect(() => {
    if (token && page === "login") setPage("books");
  }, [token, page]);

  const client = useApolloClient();

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({
      query: ALL_BOOKS,
      variables: { genre: null },
    });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        variables: { genre: null },
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      console.log("Book added", addedBook);
      updateCacheWith(addedBook);
    },
  });

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
        {token ? (
          <button onClick={() => setPage("recommended")}>recommended</button>
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

      <RecommendedBooks
        genre={meQueryResult?.data?.me?.favoriteGenre}
        show={page === "recommended"}
      />

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
