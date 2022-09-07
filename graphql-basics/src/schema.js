const typeDef = `
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

input UpdateUserInput {
  name: String
  email: String
  age: Int
}


input CreatePostInput {
  title: String!
  body: String!
  published: Boolean!
  author: ID!
}

input UpdatePostInput {
  title: String
  body: String
  published: Boolean
}

input CreateCommentInput {
  textField: String!
  author: ID!
  post: ID!
}

input UpdateCommentInput {
  textField: String
}

type Subscription {
  count: Int!
  comment(postId: ID!): CommentSubscriptionPayload!
  post: PostSubscriptionPayload!
}
 
type Mutation {
  createUser(data: CreateUserInput!): User!
  updateUser(id: ID!, data: UpdateUserInput!): User!
  deleteUser(id: ID!): User!
  createPost(data: CreatePostInput!): Post!
  updatePost(id: ID!, data: UpdatePostInput!): Post!
  deletePost(id: ID!): Post!
  createComment(data: CreateCommentInput!): Comment!
  updateComment(id: ID!, data: UpdateCommentInput!): Comment!
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
}

type PostSubscriptionPayload {
  mutation: String!
  data: Post!
}

type CommentSubscriptionPayload {
  mutation: String!
  data: Comment!
}

`

export {typeDef as default }