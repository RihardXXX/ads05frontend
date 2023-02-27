import React, { useState, useMemo, useContext } from 'react';
import styles from './cardAdvert.module.scss';
import classNames from 'classnames';
// import CardPreview from 'interfaces/CardPreview';
import { ReactComponent as Heart } from 'assets/icons/favorite.svg';
import { ReactComponent as Message } from 'assets/icons/messaging.svg';
import { stringToDate } from 'utils';
import { useNavigate } from 'react-router-dom';
import GlobalContext from 'store/context';

// TODO: сделать сетку компонент для карточек
// TODO: подключить библиотеку бесконечный скроллинг
// FIXME:

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
}

const CardAdvertPreview = ({
    id,
    name,
    comments,
    createdAt,
    favoriteCount,
    author,
    content,
}: Props): JSX.Element => {
    // const [favorite, setFavorite] = useState(false);
    const [favorite, setFavorite] = useState(false);

    const toggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
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

    // Memo field
    const avatar = useMemo<string>(() => author?.avatar, [author]);
    const username = useMemo<string>(() => author?.username, [author]);

    // Change Header Page
    const {
        header: { setHeader },
    } = useContext(GlobalContext);

    // Detail Page select
    const navigate = useNavigate();

    const detailAdvert = (): void => {
        setHeader('Подробное описание');
        navigate(`/detail-advert/${id}`);
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
                    <div className={styles.name}>{username}</div>
                    <div className={styles.date}>{stringToDate(createdAt)}</div>
                </div>
            </div>
            <div className={styles.content}>{name}</div>
            <div className={styles.footer}>
                <div className={styles.wrapFavorite} onClick={toggleFavorite}>
                    <Heart className={isFavoriteIcon} />
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
