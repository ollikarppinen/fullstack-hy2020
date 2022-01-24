const { ApolloServer, gql, UserInputError } = require("apollo-server");

const mongoose = require("mongoose");
const Book = require("./models/book");
const Author = require("./models/author");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

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
    addBook(
      title: String!
      published: Int!
      genres: [String!]!
      author: String!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      return await Book.find({});
    },
    allAuthors: async (root, args) => {
      return await Author.find({});
    },
  },
  Author: {
    name: (root) => root.name,
    bookCount: (root) =>
      books.filter(({ author }) => author == root.name).length,
  },
  Mutation: {
    addBook: async (root, args) => {
      const authorArgs = { name: args.author };
      delete args.author;

      let author = await Author.findOne(authorArgs);
      if (!author) {
        author = new Author(authorArgs);
        await author.save();
      }
      const book = new Book(args);
      book.author = author;
      return book.save();
    },
    editAuthor: async (root, args) => {
      let author = await Author.findOne({ name: args.name });
      if (!author) {
        throw new UserInputError("author not found", {
          invalidArgs: args,
        });
      }

      author.born = args.setBornTo;
      return author.save();
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
