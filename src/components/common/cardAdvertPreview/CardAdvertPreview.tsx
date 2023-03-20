import React, { useState, useMemo, useContext } from 'react';
import styles from './cardAdvert.module.scss';
import classNames from 'classnames';
// import CardPreview from 'interfaces/CardPreview';
import { ReactComponent as Heart } from 'assets/icons/favorite.svg';
import { ReactComponent as Message } from 'assets/icons/messaging.svg';
import { stringToDate } from 'utils';
import { useNavigate } from 'react-router-dom';
import GlobalContext from 'store/context';
import { useMutation } from '@apollo/client';
import { TOGGLE_FAVORITE } from 'apollo/mutation';
import Hashids from 'hashids';
import FavoriteButton from '../favoriteButton';

interface Author {
    avatar: string;
    username: string;
}
interface Props {
    id: string;
    author: Author;
    comments: [];
    createdAt: string;
    content: string;
    favoriteCount: number;
    name: string;
    favoritedBy: [];
    numberItem: number;
}

const CardAdvertPreview = ({
    id,
    name,
    comments,
    createdAt,
    favoriteCount,
    author,
    content,
    favoritedBy,
    numberItem,
}: Props): JSX.Element => {
    // Change Header Page
    const {
        header: { setHeader },
        authorization: {
            stateAuthorization: { user },
        },
    } = useContext(GlobalContext);

    // me liked
    const isFavorite = useMemo(() => {
        return favoritedBy.some(({ id }) => id === user?._id);
    }, [favoriteCount]);

    // apollo
    const [addRemoveFavorite, { loading }] = useMutation(TOGGLE_FAVORITE, {
        // fetchPolicy: "network-only" // update state cache
    });

    const toggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        addRemoveFavorite({
            variables: {
                toggleFavoriteId: id,
            },
            //  если будет сбои при выборе избранного то вручную менять состояние
            // onCompleted: data => {
            //     const advert = data.toggleFavorite;
            //     console.log('data: ', advert);
            // }
        });
    };

    // Memo field
    const avatar = useMemo<string>(() => author?.avatar, [author]);
    const username = useMemo<string>(() => author?.username, [author]);

    // Detail Page select
    const navigate = useNavigate();

    const detailAdvert = (): void => {
        setHeader('Подробное описание');
        const slug = new Hashids().encodeHex(id);
        navigate(`/detail-advert/${slug}`);
    };

    return (
        <article className={styles.card} onClick={detailAdvert}>
            <div className={styles.header}>
                {true && (
                    <div className={styles.icon}>
                        <img src={avatar} alt="" />
                    </div>
                )}
                <div className={styles.wrapHeader}>
                    <div className={styles.name}>
                        {username}{' '}
                        <div className={styles.numberItem}>{numberItem}</div>
                    </div>
                    <div className={styles.date}>{stringToDate(createdAt)}</div>
                </div>
            </div>
            <div className={styles.content}>{name}</div>
            <div className={styles.footer}>
                <FavoriteButton
                    isFavorite={isFavorite}
                    count={favoriteCount}
                    onClick={toggleFavorite}
                />
                <div className={styles.wrapComment}>
                    <Message className={styles.comment} />
                    <div className={styles.count}>{comments.length}</div>
                </div>
            </div>
        </article>
    );
};

export default CardAdvertPreview;
