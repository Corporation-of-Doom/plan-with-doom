const { find, filter } = require("lodash");

const authors = [
  { id: 1, firstName: "Tom", lastName: "Coleman" },
  { id: 2, firstName: "Sashko", lastName: "Stubailo" },
  { id: 3, firstName: "Mikhail", lastName: "Novikov" }
];

const posts = [
  { id: 1, authorId: 1, title: "Introduction to GraphQL", votes: 2 },
  { id: 2, authorId: 2, title: "Welcome to Apollo", votes: 3 },
  { id: 3, authorId: 2, title: "Advanced GraphQL", votes: 1 },
  { id: 4, authorId: 3, title: "Launchpad is Cool", votes: 7 }
];

const rootResolvers = {
  Query: {
    posts: () => posts,
    author: (_, { id }) => find(authors, { id: id })
  },
  Author: {
    id: ({ id }) => id,
    firstName: ({ firstName }) => firstName,
    lastName: ({ lastName }) => lastName,
    posts: ({ id }) => filter(posts, { authorId: id })
  },
  Post: {
    id: ({ id }) => id,
    title: ({ title }) => title,
    author: ({ authorId }) => find(authors, { id: authorId }),
    votes: ({ votes }) => votes
  }
};

module.exports = { rootResolvers };
