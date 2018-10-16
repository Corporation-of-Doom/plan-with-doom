// const { makeExecutableSchema } = require("graphql-tools");
const { Author, Post } = require("./types");

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }

  # the schema allows the following query:
  type Query {
    posts: [Post]
    author(id: Int!): Author
  }

  # this schema allows the following mutation:
  type Mutation {
    upvotePost (
      postId: Int!
    ): Post
  }
`;

module.exports = { SchemaDefinition, Author, Post };
