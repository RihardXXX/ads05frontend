import styles from './notAdverts.module.scss';

const NotAdverts = ({ message }: { message: string }) => {
    return <h3 className={styles.message}>{message}</h3>;
};

export default NotAdverts;
