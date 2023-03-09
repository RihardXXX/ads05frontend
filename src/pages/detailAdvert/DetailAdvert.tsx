import React, { useEffect, useMemo } from 'react';
import styles from './detailAdvert.module.scss';
import classNames from 'classnames';
import { ReactComponent as Watch } from 'assets/icons/watch.svg';
import Button from 'components/common/button';
import { ReactComponent as Heart } from 'assets/icons/favorite.svg';
import { useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { DETAIL_ADVERT } from 'apollo/query';
import Hashids from 'hashids';
import LoadedPage from 'components/LoadedPage/LoadedPage';

const DetailAdvert = () => {
    const classes = classNames([[styles.h2], { [styles.h2]: true, xxx: true }]);

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

    const advert = useMemo(() => data?.advert, [data]);

    const isFavorite = false;

    const isFavoriteIcon = classNames([
        [styles.heart],
        { [styles._isFavorite]: isFavorite },
    ]);
    const isFavoriteCount = classNames([
        [styles.count],
        { [styles._isFavorite]: isFavorite },
    ]);

    if (error) {
        return <h3>Что то пошло не так и объявление не найдено</h3>;
    }

    return (
        <div className={styles.detailPage}>
            {loading && <LoadedPage />}
            <div className={styles.authorSection}>
                <div className={styles.icon}>
                    <img src="" alt="" />
                </div>
                <div className={styles.author}>author</div>
            </div>
            <div className={styles.wrapperHeader}>
                <div className={styles.watch}>
                    <Watch />
                    <span>0</span>
                    <span>watches</span>
                </div>
                <div className={styles.created}>5 марта 2023 г., 14:06</div>
            </div>
            <h3 className={styles.name}>Welcome to the app</h3>
            <p className={styles.content}>
                Lorem ipsum dolor sit amet consectetur. Velit et sodales sociis
                sapien quis egestas. Mauris commodo mi faucibus sit eget in non.
                Eu enim molestie hendrerit quisque malesuada nisl sit.
            </p>
            <div className={styles.tags}>
                <Button name="теги" type="outline" color="black" />
                <Button name="теги" type="outline" color="black" />
                <Button name="теги" type="outline" color="black" />
                <Button name="теги" type="outline" color="black" />
                <Button name="теги" type="outline" color="black" />
                <Button name="теги" type="outline" color="black" />
            </div>
            <div className={styles.contactSection}>
                <h5 className={styles.title}>contact:</h5>
                <p className={styles.description}>
                    Lorem ipsum dolor sit amet consectetur. Velit et sodales
                    sociis sapien quis egestas. Mauris commodo mi faucibus sit
                    eget in non. Eu enim molestie hendrerit quisque malesuada
                    nisl sit.
                </p>
            </div>
            <div
                className={styles.wrapFavorite}
                onClick={() => console.log(112)}
            >
                <Heart className={isFavoriteIcon} />
                <div className={isFavoriteCount}>0</div>
            </div>

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
