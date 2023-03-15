import React, { ReactElement } from 'react';
import styles from './button.module.scss';
import classNames from 'classnames';

interface Props {
    name: string;
    className?: string;
    type?: 'full' | 'outline';
    color?: 'black' | 'primary' | 'error';
    disabled?: boolean;
    full?: boolean;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const Button: React.FC<Props> = ({
    name,
    className,
    type = 'full',
    color = 'black',
    disabled,
    full = false,
    onClick,
}): ReactElement => {
    const classes = classNames([
        [styles.button],
        className,
        { [styles.full_black]: type === 'full' && color === 'black' },
        { [styles.full_primary]: type === 'full' && color === 'primary' },
        { [styles.full_error]: type === 'full' && color === 'error' },
        { [styles.outline_black]: type === 'outline' && color === 'black' },
        { [styles.outline_primary]: type === 'outline' && color === 'primary' },
        { [styles.outline_error]: type === 'outline' && color === 'error' },
        { [styles.disabled]: disabled },
        { [styles.full]: full },
    ]);

    return (
        <button className={classes} onClick={onClick}>
            {name}
        </button>
    );
};

export default Button;
