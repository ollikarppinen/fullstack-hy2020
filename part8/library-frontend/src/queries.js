import { gql } from "@apollo/client";

export const ALL_BOOKS = gql`
  query AllBooks {
    allBooks {
      title
      author
      published
    }
  }
`;

export const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      bookCount
      name
      born
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $genres: [String!]!
    $author: String
    $published: Int
  ) {
    addBook(
      title: $title
      genres: $genres
      author: $author
      published: $published
    ) {
      title
      published
      author
      genres
    }
  }
`;

export const UPDATE_AUTHOR_BORN = gql`
  mutation UpdateAuthorBorn($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;
