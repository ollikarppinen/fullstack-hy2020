import React, { useState } from "react";

import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, UPDATE_AUTHOR_BORN } from "../queries";

const Authors = ({ show }) => {
  const [authorName, setAuthorName] = useState("");
  const [authorBirthyear, setAuthorBirthyear] = useState("");

  const authorQueryResult = useQuery(ALL_AUTHORS);
  const [updateAuthorBorn] = useMutation(UPDATE_AUTHOR_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!show) {
    return null;
  }

  // <select>
  //   <option value="grapefruit">Grapefruit</option>
  //   <option value="lime">Lime</option>
  //   <option selected value="coconut">
  //     Coconut
  //   </option>
  //   <option value="mango">Mango</option>
  // </select>;
  const authors = authorQueryResult.loading
    ? []
    : authorQueryResult.data.allAuthors;

  const submit = async (event) => {
    event.preventDefault();

    updateAuthorBorn({
      variables: {
        name: authorName,
        setBornTo: parseInt(authorBirthyear),
      },
    });

    setAuthorName("");
    setAuthorBirthyear("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select
            value={authorName}
            onChange={({ target }) => setAuthorName(target.value)}
          >
            {authors.map(({ name }) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div>
          birthyear
          <input
            type="number"
            value={authorBirthyear}
            onChange={({ target }) => setAuthorBirthyear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
