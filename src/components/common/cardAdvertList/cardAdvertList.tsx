import React from 'react';
import styles from './cardAdvertList.module.scss';
import CardAdvertPreview from '../cardAdvertPreview';
import CardPreview from 'interfaces/CardPreview';
import LoadedPage from 'components/LoadedPage/LoadedPage';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import InfiniteScroll from 'react-infinite-scroller';
import classNames from 'classnames';

// interface Props {
//     adverts: Array<CardPreview> | [];
// }

interface Props {
    adverts: Array<number> | [];
    isLoading?: boolean;
    loadMore?: any;
    hasNextPage?: boolean;
}

const CardAdvertList = ({
    adverts,
    isLoading = false,
    loadMore,
    hasNextPage,
}: Props): JSX.Element => {
    const classesLoader = classNames(['loader', [styles.loader]]);

    return (
        <div className={styles.listWrapper}>
            {isLoading && <LoadedPage />}
            <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}
                hasMore={hasNextPage}
                loader={
                    <div className={classesLoader} key={374463746}>
                        Загрузка
                    </div>
                }
                useWindow={false}
            >
                {Boolean(adverts.length) &&
                    adverts.map((advert, i) => <CardAdvertPreview key={i} />)}
            </InfiniteScroll>
        </div>
    );
};

export default CardAdvertList;
