import { gql } from '@apollo/client';

export const SIGN_UP_USER = gql`
    mutation SignUp($username: String!, $email: String!, $password: String!) {
        signUp(username: $username, email: $email, password: $password) {
            token
            user {
                __typename
                _id
                username
                avatar
                createdAt
            }
        }
    }
`;

export const SIGN_IN_USER = gql`
    mutation SignIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
            token
            user {
                __typename
                _id
                username
                avatar
                createdAt
            }
        }
    }
`;

export const RESET_PASSWORD_USER = gql`
    mutation RequestLinkForPassword($email: String!) {
        requestLinkForPassword(email: $email)
    }
`;

export const TOGGLE_FAVORITE = gql`
    mutation ToggleFavorite($toggleFavoriteId: String!) {
        toggleFavorite(id: $toggleFavoriteId) {
            _id
            author {
                avatar
                username
            }
            name
            content
            createdAt
            favoriteCount
            favoritedBy {
                id
            }
            content
            comments {
                _id
                content
            }
        }
    }
`;
