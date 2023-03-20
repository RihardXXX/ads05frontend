import React, { useLayoutEffect, useContext, useEffect, useMemo } from 'react';
// import styles from './adverts.module.scss';
// import classNames from 'classnames';
import CardAdvertList from 'components/common/cardAdvertList/cardAdvertList';
import { ADVERTS_FEED } from 'apollo/query';
import { useLazyQuery } from '@apollo/client';
import GlobalContext from 'store/context';

// const data = [1, 2, 3, 4, 5, 6, 7];

const Adverts: React.FC = (): JSX.Element => {
    // const classes = classNames([[styles.h2], { [styles.h2]: true, xxx: true }]);

    const {
        header: { setHeader },
    } = useContext(GlobalContext);

    useLayoutEffect(() => setHeader('Все объявления'), []);

    const limit = 4;

    const [getInitial, { loading, data, fetchMore }] = useLazyQuery(
        ADVERTS_FEED,
        {
            //fetchPolicy: "network-only" // update state cache
        }
    );

    useEffect(() => {
        getInitial({
            variables: {
                offset: 0,
                limit: limit,
            },
            notifyOnNetworkStatusChange: true,
        });
    }, []);

    const hasNextPage = useMemo(() => data?.advertFeed?.hasNextPage, [data]);

    const loadMore = () => {
        // console.log('load more');

        if (data.advertFeed.adverts.length >= data.advertFeed.totalAdverts) {
            return;
        }

        fetchMore({
            variables: {
                offset: data.advertFeed.adverts.length,
                limit: 4,
            },
            updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
                return {
                    advertFeed: {
                        ...fetchMoreResult.advertFeed,
                        offset: fetchMoreResult.advertFeed.offset + limit,
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
                hasNextPage={hasNextPage}
                loadMore={loadMore}
            />
        </>
    );
};

export default Adverts;
