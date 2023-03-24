import React from 'react';
import styles from './input.module.scss';
import classNames from 'classnames';

interface Props {
    className?: string;
    id?: string;
    label?: string;
    type?: string;
    maxLength?: number;
    isError?: boolean | string;
    value?: string;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
    className,
    id,
    label = 'label',
    type = 'text',
    maxLength,
    isError,
    value,
    placeholder,
    onChange,
}: Props) => {
    const classesWrap = classNames([[styles.wrap], className, { test: true }]);
    const classesInput = classNames([
        [styles.input],
        { [styles._isError]: isError },
    ]);

    return (
        <div className={classesWrap}>
            <label htmlFor={id} className={styles.label}>
                {label}
            </label>
            <input
                id={id}
                className={classesInput}
                type={type}
                maxLength={maxLength}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
};

export default Input;
