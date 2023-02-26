import React, { useEffect } from 'react';
import styles from './adverts.module.scss';
import classNames from 'classnames';
import CardAdvertList from 'components/common/cardAdvertList/cardAdvertList';
import { ADVERTS_FEED } from 'apollo/query';
import { useQuery, useLazyQuery } from '@apollo/client';

const data = [1, 2, 3, 4, 5, 6, 7];

function Adverts() {
    const classes = classNames([[styles.h2], { [styles.h2]: true, xxx: true }]);

    const { loading, data, fetchMore } = useQuery(ADVERTS_FEED, {
        variables: {
            offset: 0,
            limit: 4,
        },
        notifyOnNetworkStatusChange: true,
    });

    const loadMore = () => {
        console.log('load more');
        fetchMore({
            variables: {
                offset: data.advertFeed.adverts.length,
            },
            updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
                return {
                    advertFeed: {
                        ...fetchMoreResult.advertFeed,
                        offset: fetchMoreResult?.advertFeed?.offset,
                        hasNextPage: fetchMoreResult?.advertFeed?.hasNextPage,
                        adverts: [
                            ...previousResult.advertFeed.adverts,
                            ...fetchMoreResult.advertFeed.adverts,
                        ],
                    },
                };
            },
        });
    };

    return (
        <>
            <CardAdvertList
                adverts={data?.advertFeed?.adverts || []}
                isLoading={loading}
                hasNextPage={data?.advertFeed?.hasNextPage}
                loadMore={loadMore}
            />
        </>
    );
}

export default Adverts;
