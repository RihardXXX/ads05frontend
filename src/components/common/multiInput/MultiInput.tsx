import React, { ReactElement } from 'react';
import styles from './multiInput.module.scss';
import classNames from 'classnames';

interface Props {
    size?: 'default' | 'medium' | 'small';
    color?: 'black' | 'primary' | 'error';
    placeholder?: string;
    value?: string;
    isError?: boolean | string;
    onInput: (event: React.FormEvent<HTMLTextAreaElement>) => void;
    onFocus: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}

const MultiInput: React.FC<Props> = ({
    size = 'default',
    color = 'black',
    placeholder = '',
    value = '',
    isError,
    onInput,
    onFocus,
}): ReactElement => {
    const classesWrap: string = classNames([
        [styles.textareaWrap],
        {
            [styles.medium]: size === 'medium',
            [styles.small]: size === 'small',
            [styles.black]: color === 'black',
            [styles.primary]: color === 'primary',
            [styles.error]: isError,
        },
    ]);
    return (
        <textarea
            className={classesWrap}
            placeholder={placeholder}
            value={value}
            onInput={onInput}
            onFocus={onFocus}
        />
    );
};

export default MultiInput;
