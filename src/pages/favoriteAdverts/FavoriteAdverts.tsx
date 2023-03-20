import React, {
    useLayoutEffect,
    useContext,
    useEffect,
    useMemo,
    ReactElement,
} from 'react';
import GlobalContext from 'store/context';
import { useLazyQuery } from '@apollo/client';
import { ADVERT_FEED_FAVORITE } from 'apollo/query';
import CardAdvertList from 'components/common/cardAdvertList';

const FavoriteAdverts: React.FC = (): ReactElement => {
    const {
        header: { setHeader },
    } = useContext(GlobalContext);

    useLayoutEffect(() => setHeader('Избранные объявления'), []);

    const limit = 4;

    const [getInitial, { loading, data, fetchMore }] = useLazyQuery(
        ADVERT_FEED_FAVORITE,
        {
            fetchPolicy: 'network-only', // update state cache
        }
    );

    useEffect(() => {
        getInitial({
            variables: {
                offset: 0,
                limit: limit,
            },
            notifyOnNetworkStatusChange: true, // loading status current
        });
    }, []);

    const hasNextPage = useMemo(
        () => data?.advertFeedFavorite?.hasNextPage,
        [data]
    );

    const loadMore = () => {
        // console.log('load more');

        if (
            data.advertFeedFavorite.adverts.length >=
            data.advertFeedFavorite.totalAdverts
        ) {
            return;
        }

        fetchMore({
            variables: {
                offset: data.advertFeedFavorite.adverts.length,
                limit: 4,
            },
            updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
                return {
                    advertFeedFavorite: {
                        ...fetchMoreResult.advertFeedFavorite,
                        offset:
                            fetchMoreResult.advertFeedFavorite.offset + limit,
                        adverts: [
                            ...previousResult.advertFeedFavorite.adverts,
                            ...fetchMoreResult.advertFeedFavorite.adverts,
                        ],
                    },
                };
            },
        });
    };

    return (
        <>
            <CardAdvertList
                adverts={data?.advertFeedFavorite?.adverts || []}
                isLoading={loading}
                hasNextPage={hasNextPage}
                loadMore={loadMore}
            />
        </>
    );
};

export default FavoriteAdverts;
