import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import styles from './baseModal.module.scss';
import classNames from 'classnames';
import { ReactComponent as Close } from 'assets/icons/close.svg';

interface Props {
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    children?: React.ReactNode;
}

const BaseModal: React.FC<Props> = ({ onClick, children }): ReactElement => {
    const [upModal, setUpModal] = useState<boolean>(false);

    useEffect((): void => {
        setTimeout(() => setUpModal(true));
    }, []);

    const modalClasses = classNames([
        [styles.modal],
        { [styles.show]: upModal },
    ]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.overlay} onClick={onClick}></div>
            <div className={modalClasses}>
                {children}{' '}
                <div className={styles.icon} onClick={onClick}>
                    <Close />
                </div>
            </div>
        </div>
    );
};

export default BaseModal;
