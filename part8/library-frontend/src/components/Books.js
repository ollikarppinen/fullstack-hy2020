import React, { useState } from "react";

import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = ({ show }) => {
  const [genre, setGenre] = useState(null);
  const bookQueryResult = useQuery(ALL_BOOKS, { variables: { genre } });

  if (!show) {
    return null;
  }
  const books = bookQueryResult?.loading ? [] : bookQueryResult?.data?.allBooks;
  const uniqueGenres = [...new Set(books.flatMap(({ genres }) => genres))];

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {uniqueGenres.map((genre) => (
          <button key={genre} onClick={() => setGenre(genre)}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
