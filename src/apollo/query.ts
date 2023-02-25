import { gql } from '@apollo/client';

export const ADVERTS_FEED = gql`
    query AdvertFeed($offset: Int!, $limit: Int!) {
        advertFeed(offset: $offset, limit: $limit) {
            totalAdverts
            hasNextPage
            nextPage
            offset
            limit
            page
            adverts {
                _id
                name
                author {
                    avatar
                    username
                }
                createdAt
                content
                favoriteCount
                comments {
                    _id
                    content
                }
            }
        }
    }
`;
