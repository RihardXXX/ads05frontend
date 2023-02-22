import React, { useState, useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from 'apollo/apollo';
import './App.scss';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from 'layouts/default/Layout';
import Private from 'components/common/Private';
import Public from 'components/common/Public';
import Adverts from 'pages/adverts';
import CreateAdverts from 'pages/createAdvert';
import EditAdverts from 'pages/editAdvert';
import FavoriteAdverts from 'pages/favoriteAdverts';
import MyAdverts from 'pages/myAdverts';
import Signin from 'pages/signin';
import Signup from 'pages/signup';
import GlobalContext from 'store/context';
import useAdverts from 'store/useAdverts';
import useAuthorization from 'store/useAuthorization';

const NotFound = () => <h3>Not Found</h3>;

// console.log(process.env);

function App() {
    // state and dispatch adverts
    const { stateAdverts, dispatchAdverts } = useAdverts();
    const { stateAuthorization, dispatchAuth } = useAuthorization();

    const value = {
        authorization: { stateAuthorization, dispatchAuth },
        adverts: { stateAdverts, dispatchAdverts },
    };

    return (
        <ApolloProvider client={client}>
            <GlobalContext.Provider value={value}>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={<Private Component={Layout} />}
                        >
                            <Route index element={<Adverts />} />
                            <Route path="create" element={<CreateAdverts />} />
                            <Route path="edit" element={<EditAdverts />} />
                            <Route
                                path="favorites"
                                element={<FavoriteAdverts />}
                            />
                            <Route path="my" element={<MyAdverts />} />
                            <Route path="*" element={<NotFound />} />
                        </Route>
                        <Route path="signin" element={<Signin />} />
                        <Route path="signup" element={<Signup />} />
                    </Routes>
                </BrowserRouter>
            </GlobalContext.Provider>
        </ApolloProvider>
    );
}

export default App;
