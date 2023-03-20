import React, { ReactElement } from 'react';
import styles from './cardAdvertList.module.scss';
import CardAdvertPreview from 'components/common/cardAdvertPreview';
import LoadedPage from 'components/LoadedPage/LoadedPage';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import InfiniteScroll from 'react-infinite-scroller';
import classNames from 'classnames';
import NotAdverts from 'components/common/notAdverts';

interface Props {
    adverts: Array<number> | [];
    isLoading?: boolean;
    loadMore?: any;
    hasNextPage?: boolean;
}

const CardAdvertList: React.FC<Props> = ({
    adverts,
    isLoading = false,
    loadMore,
    hasNextPage,
}): ReactElement => {
    const classesLoader = classNames(['loader', [styles.loader]]);

    return (
        <div className={styles.listWrapper}>
            {isLoading && <LoadedPage />}
            <InfiniteScroll
                pageStart={0}
                loadMore={() => (!isLoading ? loadMore() : undefined)}
                hasMore={hasNextPage}
                loader={
                    hasNextPage && (
                        <div className={classesLoader} key={374463746}>
                            Загрузка
                        </div>
                    )
                }
                useWindow={false}
            >
                {Boolean(adverts.length) &&
                    adverts.map((advert: any, i: number) => (
                        <CardAdvertPreview
                            key={advert._id}
                            id={advert._id}
                            name={advert.name}
                            author={advert.author}
                            comments={advert.comments}
                            createdAt={advert.createdAt}
                            content={advert.content}
                            favoriteCount={advert.favoriteCount}
                            favoritedBy={advert.favoritedBy}
                            numberItem={Number(i) + 1}
                        />
                    ))}
                {Boolean(!adverts.length) && !isLoading && (
                    <NotAdverts message="Объявления отсутствуют" />
                )}
            </InfiniteScroll>
        </div>
    );
};

export default CardAdvertList;
