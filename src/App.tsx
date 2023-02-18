import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from 'apollo/apollo';
import './App.scss';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from 'layouts/default/Layout';
import Private from 'components/common/Private';
import Adverts from 'pages/adverts';
import CreateAdverts from 'pages/createAdvert';
import EditAdverts from 'pages/editAdvert';
import FavoriteAdverts from 'pages/favoriteAdverts';
import MyAdverts from 'pages/myAdverts';
import Sigin from 'pages/signin';
import Signup from 'pages/signup';
import LoadedPage from 'components/LoadedPage/LoadedPage';
import GlobalContext from 'store/context';
import useAdverts from 'store/useAdverts';

const NotFound = () => <h3>Not Found</h3>;

// console.log(process.env);

function App() {
    // state loading
    const [isLoading, setIsLoading] = useState(false);
    // state and dispatch adverts
    const { stateAdverts, dispatch } = useAdverts();

    const value = {
        loading: { isLoading, setIsLoading },
        authorization: {},
        adverts: { stateAdverts, dispatch },
    };

    return (
        <ApolloProvider client={client}>
            <GlobalContext.Provider value={value}>
                <BrowserRouter>
                    <LoadedPage show={isLoading} />
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
                        <Route path="signin" element={<Sigin />} />
                        <Route path="signup" element={<Signup />} />
                    </Routes>
                </BrowserRouter>
            </GlobalContext.Provider>
        </ApolloProvider>
    );
}

export default App;
