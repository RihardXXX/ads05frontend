import React, {
    useLayoutEffect,
    useContext,
    useEffect,
    useMemo,
    ReactElement,
} from 'react';
import GlobalContext from 'store/context';
import { useLazyQuery } from '@apollo/client';
import CardAdvertList from 'components/common/cardAdvertList';
import { ADVERT_FEED_MY } from 'apollo/query';

const MyAdverts: React.FC = (): ReactElement => {
    const {
        header: { setHeader },
    } = useContext(GlobalContext);

    useLayoutEffect((): void => setHeader('Мои объявления'), []);

    const limit = 4;

    const [getInitial, { loading, data, fetchMore }] = useLazyQuery(
        ADVERT_FEED_MY,
        {
            fetchPolicy: 'network-only', // update state cache
        }
    );

    useEffect((): void => {
        getInitial({
            variables: {
                offset: 0,
                limit: limit,
            },
            notifyOnNetworkStatusChange: true, // loading status current
        });
    }, []);

    const hasNextPage = useMemo(() => data?.advertFeedMy?.hasNextPage, [data]);

    const loadMore = (): void => {
        if (
            data.advertFeedMy.adverts.length >= data.advertFeedMy.totalAdverts
        ) {
            return;
        }

        fetchMore({
            variables: {
                offset: data.advertFeedMy.adverts.length,
                limit: 4,
            },
            updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
                return {
                    advertFeedMy: {
                        ...fetchMoreResult.advertFeedMy,
                        offset: fetchMoreResult.advertFeedMy.offset + limit,
                        adverts: [
                            ...previousResult.advertFeedMy.adverts,
                            ...fetchMoreResult.advertFeedMy.adverts,
                        ],
                    },
                };
            },
        });
    };

    return (
        <>
            <CardAdvertList
                adverts={data?.advertFeedMy?.adverts || []}
                isLoading={loading}
                hasNextPage={hasNextPage}
                loadMore={loadMore}
            />
        </>
    );
};

export default MyAdverts;
