import gql from "graphql-tag";
/**
 * Item and user-related queries and mutations.
 */

// const ItemFields = gql`
//   fragment ItemFields on Item {
//     # @TODO: Create a fragment to query the following fields for an item:
//     #
//      id
//      title
//      imageurl
//      description
//      created
//     # tags (id and title fields)
//     # itemowner (id, fullname, email, and bio fields)
//     # borrower (id, fullname, email, and bio fields)
//     #
//     # See the Apollo docs for instructions on how to use fragments:
//     # https://www.apollographql.com/docs/angular/features/fragments.html
//   }
// `;
// export const ITEM_QUERY = gql`
//   query item($id: ID!) {
//     # @TODO: Query an item by its id and return the ItemFields fragment.
//   }
//   ${ItemFields}
// `;

export const ALL_ITEMS_QUERY = gql`
query GetItems ($id: ID){
  items (id: $id){
   id
   title
   imageurl
   description
   itemowner
   fullname
   created
 }
}
`;

export const OWNER_ITEMS_QUERY = gql`
query GetOwnerItems ($id: ID){
  owneritems (id: $id){
   id
   title
   imageurl
   description
   borrower{
     id
     fullname
   }
 }
}
`;

// export const ALL_USER_ITEMS_QUERY = gql`
//   query user($id: ID!) {
//     # @TODO: Query the bio, email, fullname, items, and borrowed for the user by id
//     # Use the ItemFields fragment for the items and borrowed fields.
//   }
//   ${ItemFields}
// `;

// export const ALL_TAGS_QUERY = gql`
//   query {
//     # @TODO: Query the id and title fields for tags.
//   }
// `;

export const ADD_ITEM_MUTATION = gql`
  mutation addItem($item: NewItemInput!) {
    addItem(item: $item) {
      id
      title
      imageurl
      description
      itemowner
      created
      borrower
      {
        id
      }
    }
  }
`

// /**
//  * Auth-related queries and mutations.
//  */

export const VIEWER_QUERY = gql`
query GetUserByID ($id: ID!){
  user (id: $id) {
    id
    fullname
    email
    items{
      id
      title
    }
    borrowed{
      id
      title
    }
  }
}
`;

export const LOGOUT_MUTATION = gql`
  mutation 
  {
    logout
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation signup($user: SignupInput!) {
    signup(user: $user){
      user{
        id
        fullname
        email
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($user: LoginInput!) {
    login(user: $user){
      user {
        id
        fullname
        email
      }
    }
  }
`;

