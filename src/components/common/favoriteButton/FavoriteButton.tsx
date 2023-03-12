import React from 'react';
import styles from './favoriteButton.module.scss';
import classNames from 'classnames';
import { ReactComponent as Heart } from 'assets/icons/favorite.svg';

interface Props {
    isFavorite?: boolean;
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
    count?: string | number;
}

const FavoriteButton = ({ isFavorite, onClick, count = 0 }: Props) => {
    const isFavoriteIcon: string = classNames([
        [styles.heart],
        { [styles._isFavorite]: isFavorite },
    ]);
    const isFavoriteCount: string = classNames([
        [styles.count],
        { [styles._isFavorite]: isFavorite },
    ]);
    return (
        <div className={styles.wrapFavorite} onClick={onClick}>
            <Heart className={isFavoriteIcon} />
            <div className={isFavoriteCount}>{count}</div>
        </div>
    );
};

export default FavoriteButton;
