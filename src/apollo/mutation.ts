import { gql } from '@apollo/client';

export const SIGN_UP_USER = gql`
    mutation SignUp($username: String!, $email: String!, $password: String!) {
        signUp(username: $username, email: $email, password: $password)
    }
`;

export const SIGN_IN_USER = gql`
    mutation SignIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password)
    }
`;

export const RESET_PASSWORD_USER = gql`
    mutation RequestLinkForPassword($email: String!) {
        requestLinkForPassword(email: $email)
    }
`;
