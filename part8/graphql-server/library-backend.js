const { ApolloServer, gql } = require("apollo-server");
const { v1: uuid } = require("uuid");

const mongoose = require("mongoose");
const Book = require("./models/book");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

const books = [];
const authors = [];

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String
    id: ID!
    born: Int
    bookCount: Int
  }

  type Query {
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    bookCount: Int!
    authorCount: Int!
  }

  type Mutation {
    addBook(title: String!, published: Int, genres: [String!]!): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    authorCount: () => authors.length,
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      return await Book.find({});
    },
    allAuthors: () => authors,
  },
  Author: {
    name: (root) => root.name,
    bookCount: (root) =>
      books.filter(({ author }) => author == root.name).length,
  },
  Mutation: {
    addBook: (root, args) => {
      const book = new Book(args);
      return book.save();
    },
    editAuthor: (root, args) => {
      const author = authors.find(({ name }) => name === args.name);
      if (!author) {
        return null;
      }

      const updatedAuthor = { ...author, born: args.setBornTo };
      authors = authors.map((author) =>
        author.name === args.name ? updatedAuthor : author
      );
      return updatedAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
