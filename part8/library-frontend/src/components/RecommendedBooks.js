import React from "react";

import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const RecommendedBooks = ({ show, genre }) => {
  const bookQueryResult = useQuery(ALL_BOOKS, { variables: { genre } });

  if (!show) {
    return null;
  }
  const books = bookQueryResult.loading ? [] : bookQueryResult.data.allBooks;

  return (
    <div>
      <h2>recommendations</h2>

      <div>
        books in your favorite genre <strong>{genre}</strong>
      </div>

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
    </div>
  );
};

export default RecommendedBooks;
