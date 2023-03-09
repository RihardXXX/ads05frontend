import { gql } from '@apollo/client';

export const ADVERTS_FEED = gql`
    query AdvertFeed($offset: Int!, $limit: Int!) {
        advertFeed(offset: $offset, limit: $limit) {
            totalAdverts
            hasNextPage
            nextPage
            offset
            limit
            # page
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
                favoritedBy {
                    id
                }
            }
        }
    }
`;

export const ME_USER = gql`
    query Me {
        me {
            _id
            username
            avatar
            email
            createdAt
        }
    }
`;

export const DETAIL_ADVERT = gql`
    query Advert($advertId: String!) {
        advert(id: $advertId) {
            _id
            author {
                avatar
                username
            }
            name
            content
            category
            createdAt
            favoriteCount
            favoritedBy {
                id
            }
            contact
            watch
        }
    }
`;
