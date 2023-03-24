import React, { ReactElement } from 'react';
import styles from './multiInput.module.scss';
import classNames from 'classnames';

interface Props {
    size?: 'default' | 'medium' | 'small';
    color?: 'black' | 'primary' | 'error';
    placeholder?: string;
    value?: string;
    isError?: boolean | string;
    label?: string;
    id?: string;
    className?: string;
    onInput: (event: React.FormEvent<HTMLTextAreaElement>) => void;
    onFocus: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}

const MultiInput: React.FC<Props> = ({
    size = 'default',
    color = 'black',
    placeholder = '',
    value = '',
    isError,
    label = '',
    id,
    className,
    onInput,
    onFocus,
}): ReactElement => {
    const wrap = classNames([[styles.wrap], className]);

    const textareaWrap: string = classNames([
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
        <div className={wrap}>
            {Boolean(label) && (
                <label htmlFor={id} className={styles.label}>
                    {label}
                </label>
            )}
            <textarea
                id={id}
                className={textareaWrap}
                placeholder={placeholder}
                value={value}
                onInput={onInput}
                onFocus={onFocus}
            />
        </div>
    );
};

export default MultiInput;
