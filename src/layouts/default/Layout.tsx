import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import styles from './index.module.scss';
import Header from 'components/layot/header';
import Footer from 'components/layot/footer';

function Layout() {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default Layout;
