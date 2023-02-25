import React, { useState } from 'react';
import styles from './cardAdvert.module.scss';
import classNames from 'classnames';
// import CardPreview from 'interfaces/CardPreview';
import { ReactComponent as Heart } from 'assets/icons/favorite.svg';
import { ReactComponent as Message } from 'assets/icons/messaging.svg';

// TODO: сделать сетку компонент для карточек
// TODO: подключить библиотеку бесконечный скроллинг
// FIXME:

interface Props {
    author: string;
    avatar?: string;
    createdAt: string;
    content: string;
    favoriteCount: number;
    commentsCount: number;
}

// const CardAdvertPreview = ({ icon, name, date, content, favorite, favoriteCount, messagesCount }: CardPreview): JSX.Element => {
const CardAdvertPreview = (): JSX.Element => {
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

    // return (
    //     <article className={styles.card}>
    //         <div className={styles.header}>
    //             { icon && <div className={styles.icon}>{ icon }</div> }
    //             <div className={styles.wrapHeader}>
    //                 <div className={styles.name}>{ name }</div>
    //                 <div className={styles.date}>{ date }</div>
    //             </div>
    //         </div>
    //         <div className={styles.content}>
    //             { content }
    //         </div>
    //         <div className={styles.footer}>
    //             <div className={styles.wrapFavorite}>
    //                 <Heart
    //                     className={isFavoriteIcon}
    //                     onClick={toggleFavorite}
    //                 />
    //                 <div className={isFavoriteCount}>{ favoriteCount }</div>
    //             </div>
    //             <div className={styles.wrapComment}>
    //                 <Message className={styles.comment} />
    //                 <div className={styles.count}>{ messagesCount }</div>
    //             </div>
    //         </div>
    //     </article>
    // );
    return (
        <article className={styles.card}>
            <div className={styles.header}>
                {true && <div className={styles.icon}>icon</div>}
                <div className={styles.wrapHeader}>
                    <div className={styles.name}> name </div>
                    <div className={styles.date}> date </div>
                </div>
            </div>
            <div className={styles.content}>content</div>
            <div className={styles.footer}>
                <div className={styles.wrapFavorite}>
                    <Heart
                        className={isFavoriteIcon}
                        onClick={toggleFavorite}
                    />
                    <div className={isFavoriteCount}>1</div>
                </div>
                <div className={styles.wrapComment}>
                    <Message className={styles.comment} />
                    <div className={styles.count}>2</div>
                </div>
            </div>
        </article>
    );
};

export default CardAdvertPreview;
