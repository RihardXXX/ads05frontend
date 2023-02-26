import React, { useState, useMemo } from 'react';
import styles from './cardAdvert.module.scss';
import classNames from 'classnames';
// import CardPreview from 'interfaces/CardPreview';
import { ReactComponent as Heart } from 'assets/icons/favorite.svg';
import { ReactComponent as Message } from 'assets/icons/messaging.svg';
import { stringToDate } from 'utils';

// TODO: сделать сетку компонент для карточек
// TODO: подключить библиотеку бесконечный скроллинг
// FIXME:

interface Author {
    avatar: string;
    username: string;
}
interface Props {
    author: Author;
    comments: [];
    createdAt: string;
    content: string;
    favoriteCount: number;
    name: string;
}

const CardAdvertPreview = ({
    name,
    comments,
    createdAt,
    favoriteCount,
    author,
    content,
}: Props): JSX.Element => {
    // const [favorite, setFavorite] = useState(false);
    const [favorite, setFavorite] = useState(false);

    const toggleFavorite = () => {
        // setFavorite(!favorite);
        console.log('toggle favorite');
    };

    const isFavoriteIcon = classNames([
        [styles.heart],
        { [styles._isFavorite]: favorite },
    ]);
    const isFavoriteCount = classNames([
        [styles.count],
        { [styles._isFavorite]: favorite },
    ]);

    const avatar = useMemo<string>(() => author?.avatar, [author]);
    const username = useMemo<string>(() => author?.username, [author]);

    return (
        <article className={styles.card}>
            <div className={styles.header}>
                {true && (
                    <div className={styles.icon}>
                        <img src={avatar} alt="" />
                    </div>
                )}
                <div className={styles.wrapHeader}>
                    <div className={styles.name}>{username}</div>
                    <div className={styles.date}>{stringToDate(createdAt)}</div>
                </div>
            </div>
            <div className={styles.content}>{name}</div>
            <div className={styles.footer}>
                <div className={styles.wrapFavorite}>
                    <Heart
                        className={isFavoriteIcon}
                        onClick={toggleFavorite}
                    />
                    <div className={isFavoriteCount}>{favoriteCount}</div>
                </div>
                <div className={styles.wrapComment}>
                    <Message className={styles.comment} />
                    <div className={styles.count}>{comments.length}</div>
                </div>
            </div>
        </article>
    );
};

export default CardAdvertPreview;
