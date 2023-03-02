import React, { useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './index.module.scss';
import Header from 'components/layot/header';
import Footer from 'components/layot/footer';
import { useLazyQuery } from '@apollo/client';
import { ME_USER } from 'apollo/query';
import LoadedPage from 'components/LoadedPage/LoadedPage';
import GlobalContext from 'store/context';
import { setUser } from 'store/actions';

function Layout() {
    // apollo
    const [getUser, { loading }] = useLazyQuery(ME_USER);

    // state
    const {
        authorization: { dispatchAuth },
    } = useContext(GlobalContext);

    // fetch data User
    useEffect(() => {
        getUser({
            variables: {},
            onCompleted: ({ me }) => {
                dispatchAuth(setUser('userData', me));
            },
        });
    }, []);

    return (
        <>
            {Boolean(loading) && <LoadedPage />}
            <Header />
            <main className={styles.main}>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default Layout;
