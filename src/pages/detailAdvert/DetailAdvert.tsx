import React, { useEffect, useMemo, useContext, useLayoutEffect } from 'react';
import styles from './detailAdvert.module.scss';
import classNames from 'classnames';
import { ReactComponent as Watch } from 'assets/icons/watch.svg';
import Button from 'components/common/button';
import { ReactComponent as Heart } from 'assets/icons/favorite.svg';
import { useParams } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import { DETAIL_ADVERT } from 'apollo/query';
import Hashids from 'hashids';
import LoadedPage from 'components/LoadedPage/LoadedPage';
import GlobalContext from 'store/context';
import { plural, stringToDate } from 'utils/index';
import { TOGGLE_FAVORITE } from 'apollo/mutation';

const DetailAdvert = () => {
    // const classes = classNames([[styles.h2], { [styles.h2]: true, xxx: true }]);

    const {
        header: { setHeader },
        authorization: {
            stateAuthorization: { user },
        },
    } = useContext(GlobalContext);

    // set header
    useLayoutEffect(() => setHeader('Подробное описание'), []);

    // route param
    const { id } = useParams();

    // apollo
    const [getAdvert, { data, loading, error }] = useLazyQuery(DETAIL_ADVERT);

    // initial advert
    useEffect(() => {
        if (!id) {
            return;
        }

        const _id = new Hashids().decodeHex(id);

        // console.log(_id);
        getAdvert({
            variables: {
                advertId: _id,
            },
            notifyOnNetworkStatusChange: true,
            onCompleted(data) {
                console.log(data);
            },
            onError: (error) => {
                console.log(error);
            },
        });
    }, []);

    // base data
    const advert = useMemo(() => data?.advert, [data]);

    // me liked
    const isFavorite = useMemo(() => {
        return advert?.favoritedBy.some(
            ({ id }: { id?: string }): boolean => id === user?._id
        );
    }, [advert]);

    const isFavoriteIcon = classNames([
        [styles.heart],
        { [styles._isFavorite]: isFavorite },
    ]);
    const isFavoriteCount = classNames([
        [styles.count],
        { [styles._isFavorite]: isFavorite },
    ]);

    // apollo
    const [addRemoveFavorite] = useMutation(TOGGLE_FAVORITE);

    const toggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!id) {
            return;
        }
        const _id = new Hashids().decodeHex(id);
        addRemoveFavorite({
            variables: {
                toggleFavoriteId: _id,
            },
        });
    };

    if (error) {
        return <h3>Что то пошло не так и объявление не найдено</h3>;
    }

    return (
        <div className={styles.detailPage}>
            {loading && <LoadedPage />}

            {Boolean(advert) && (
                <>
                    <div className={styles.authorSection}>
                        <div className={styles.icon}>
                            <img src={advert.author.avatar} alt="" />
                        </div>
                        <div className={styles.author}>
                            {advert?.author?.username}
                        </div>
                    </div>
                    <div className={styles.wrapperHeader}>
                        <div className={styles.watch}>
                            <Watch />
                            <span>{advert?.watch}</span>
                            <span>
                                {plural(advert?.watch, [
                                    'просмотр',
                                    'просмотра',
                                    'просмотров',
                                ])}
                            </span>
                        </div>
                        <div className={styles.created}>
                            {stringToDate(advert.createdAt)}
                        </div>
                    </div>
                    <h3 className={styles.name}>{advert.name}</h3>
                    <p className={styles.content}>{advert.content}</p>

                    {Boolean(advert.category.length) && (
                        <div className={styles.tags}>
                            {advert.category.map((category: string) => {
                                return (
                                    <Button
                                        key={`category ${category}`}
                                        name={category}
                                        type="outline"
                                        color="black"
                                    />
                                );
                            })}
                        </div>
                    )}

                    {Boolean(advert.contact) && (
                        <div className={styles.contactSection}>
                            <h5 className={styles.title}>контакты:</h5>
                            <p className={styles.description}>
                                {advert.contact}
                            </p>
                        </div>
                    )}

                    <div
                        className={styles.wrapFavorite}
                        onClick={toggleFavorite}
                    >
                        <Heart className={isFavoriteIcon} />
                        <div className={isFavoriteCount}>
                            {advert.favoriteCount}
                        </div>
                    </div>
                </>
            )}

            <div className={styles.commentSection}>
                <h5 className={styles.title}>comments:</h5>
                {[1, 2, 3, 4, 5, 6].map((index) => {
                    return (
                        <article key={index} className={styles.card}>
                            <h6 className={styles.author}>author</h6>
                            <p className={styles.comment}>
                                content jfhgkehdkdshkfs
                            </p>
                        </article>
                    );
                })}
            </div>
        </div>
    );
};

export default DetailAdvert;
