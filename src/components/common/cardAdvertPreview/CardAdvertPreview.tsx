import React, { useState } from 'react';
import styles from './cardAdvert.module.scss';
import classNames from 'classnames';
import { ReactComponent as Heart } from 'assets/icons/favorite.svg';
import { ReactComponent as Message } from 'assets/icons/messaging.svg';

// TODO: сделать сетку компонент для карточек
// TODO: подключить библиотеку бесконечный скроллинг
// FIXME:

const CardAdvertPreview = (): JSX.Element => {
    const [favorite, setFavorite] = useState(false);

    const toggleFavorite = () => {
        setFavorite(!favorite);
    };

    const isFavoriteIcon = classNames([
        [styles.heart],
        { [styles._isFavorite]: favorite },
    ]);
    const isFavoriteCount = classNames([
        [styles.count],
        { [styles._isFavorite]: favorite },
    ]);

    return (
        <article className={styles.card}>
            <div className={styles.header}>
                <div className={styles.icon}>xxx</div>
                <div className={styles.wrapHeader}>
                    <div className={styles.name}>name</div>
                    <div className={styles.date}>date</div>
                </div>
            </div>
            <div className={styles.content}>
                Lorem ipsum dolor sit amet consectetur. Varius viverra sit
                fringilla proin tristique in.
            </div>
            <div className={styles.footer}>
                <div className={styles.wrapFavorite}>
                    <Heart
                        className={isFavoriteIcon}
                        onClick={toggleFavorite}
                    />
                    <div className={isFavoriteCount}>10</div>
                </div>
                <div className={styles.wrapComment}>
                    <Message className={styles.comment} />
                    <div className={styles.count}>4</div>
                </div>
            </div>
        </article>
    );
};

export default CardAdvertPreview;
