import React, { ReactElement } from 'react';
import styles from './multiInput.module.scss';
import classNames from 'classnames';

interface Props {
    size?: 'default' | 'medium' | 'small';
    color?: 'black' | 'primary' | 'error';
    placeholder?: string;
}

const MultiInput: React.FC<Props> = ({
    size = 'default',
    color = 'black',
    placeholder = '',
}): ReactElement => {
    const classesWrap: string = classNames([
        [styles.textareaWrap],
        {
            [styles.medium]: size === 'medium',
            [styles.small]: size === 'small',
            [styles.black]: color === 'black',
            [styles.primary]: color === 'primary',
            [styles.error]: color === 'error',
        },
    ]);
    return <textarea className={classesWrap} placeholder={placeholder} />;
};

export default MultiInput;
