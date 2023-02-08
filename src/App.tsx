import React from 'react';
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

const NotFound = () => <h3>Not Found</h3>;

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Private Component={Layout} />}>
                    <Route index element={<Adverts />} />
                    <Route path="create" element={<CreateAdverts />} />
                    <Route path="edit" element={<EditAdverts />} />
                    <Route path="favorites" element={<FavoriteAdverts />} />
                    <Route path="my" element={<MyAdverts />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
                <Route path="signin" element={<Sigin />} />
                <Route path="signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
