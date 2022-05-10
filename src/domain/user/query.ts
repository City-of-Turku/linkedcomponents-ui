// eslint-disable-next-line import/no-named-as-default
import gql from 'graphql-tag';

export const QUERY_USER = gql`
  fragment userFields on User {
    adminOrganizations
    dateJoined
    departmentName
    displayName
    email
    firstName
    isStaff
    lastLogin
    lastName
    organization
    organizationMemberships
    username
    uuid
  }

  query User($id: ID!, $createPath: Any) {
    user(id: $id) @rest(type: "User", pathBuilder: $createPath) {
      ...userFields
    }
  }

  query Users($createPath: Any, $page: Int) {
    users(page: $page) @rest(type: "UsersResponse", pathBuilder: $createPath) {
      meta {
        ...metaFields
      }
      data {
        ...userFields
      }
    }
  }
`;
