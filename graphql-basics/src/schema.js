const typeDefs = 
  `
  type Query {
  post: Post!
  user: User!
  users(query: String): [User!]!
  posts(query: String): [Post!]!
  comments: [Comment!]!
}

input CreateUserInput {
  name: String!
  email: String!
  age: Int!
}

input CreatePostInput {
  title: String!
  body: String!
  published: Boolean!
  author: ID!
}

input CreateCommentInput {
  textField: String!
  author: ID!
  post: ID!
}

type Mutation {
  createUser(data: CreateUserInput): User!
  deleteUser(id: ID!): User!
  createPost(data: CreatePostInput): Post!
  deletePost(id: ID!): Post!
  createComment(data: CreateCommentInput): Comment!
  deleteComment(id: ID!): Comment!
}

type User {
  id: ID!
  name: String!
  email: String!
  age: Int!
  posts: [Post!]!
  comments: [Comment!]!
}

type Post {
  id: ID!
  title: String!
  body: String!
  published: Boolean!
  author: User!
  comments: [Comment!]!
}

type Comment {
  id: ID!
  textField: String!
  author: User!
  post: Post!
} `

export {typeDefs as default}