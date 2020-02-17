const { gql } = require("apollo-server-express");

/**
 *  @TODO: Boomtown Schema
 *
 * Define the types in your GraphQL schema here.
 * For each type, remove the `_: Boolean` placeholder and add the
 * fields as directed. Be sure to finish writing resolvers for all types
 * and any relational fields, where required.
 *
 * We will create the custom Date scalar together.
 */
module.exports = gql`
  directive @auth on FIELD_DEFINITION
  scalar Date

  type Item {
    id: ID!
    title: String!
    imageurl: String
    description: String
    itemowner: ID
    fullname:String
    tags: String
    created: Date
    borrower: ID
  }

  type Items {
    items : [Item]
  }

  type Users {
    users : [User]
  }

  type User {
    id: ID
    email: String
    fullname: String
    bio: String
    items: [Item]
    borrowed: [Item]
    password: String
  }
  

  type File {
    id: ID!
    filename: String!
    mimetype: String!
    encoding: String!
    itemid: ID!
  }

  type AuthPayload {
    token: String
    user: User
  }

  input AssignedTag {
    title: String!
    id: String!
  }

  input AssignedBorrower {
    id: String
  }

  type Id {
    id: ID!
  }

  input AssignedOwner {
    id: ID!
  }

  input NewItemInput {
    title: String!
    description: String
    tags: [String]
    imageUrl: String
    itemowner: ID
    created: Date
  }

  input BorrowInput {
    id: ID
    title: String!
    description: String
    tags: [String]
    imageurl: String
    itemowner: ID
    created: Date
    fullname: String
    borrower: ID
  }

  type Query {
    user(id: ID!): User
    viewer: User
    users: [User]
    items(id: ID): [Item]
    owneritems(id: ID): [Item]
  }

  input LoginInput {
    email:String!
    password: String!
   }

   input Token {
     token: String
   }

   input SignupInput {
     fullname: String
     email: String
     password: String
   }

  type Mutation {
    addItem(item: NewItemInput!): Item
    borrowItem(item: BorrowInput!): Item
    signup(user: SignupInput!): AuthPayload!
    login(user: LoginInput!): AuthPayload!
    logout: Boolean!
   }
  

`;
