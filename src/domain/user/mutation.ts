// eslint-disable-next-line import/no-named-as-default
import gql from 'graphql-tag';

export const MUTATION_EVENT = gql`
  mutation CreateUser($input: CreateUserMutationInput!) {
    createUser(input: $input)
      @rest(type: "User", path: "/user/", method: "POST", bodyKey: "input") {
      ...userFields
    }
  }
`;
