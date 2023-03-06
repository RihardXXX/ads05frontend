import React from 'react';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { setLogin } from 'store/actions';
import { login } from 'store/actionType';

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_URI,
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');

    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? token : '',
        },
    };
});

const client = new ApolloClient({
    // uri: process.env.REACT_APP_URI,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        // typePolicies: {
        //     Query: {
        //         fields: {
        //             adverts: {
        //                 // keyArgs: [],
        //                 merge(
        //                     existing,
        //                     incoming,
        //                     { args: { offset = 0 } }: any
        //                 ) {
        //                     console.log('existing: ', existing);
        //                     console.log('incoming: ', incoming);
        //                     // Slicing is necessary because the existing data is
        //                     // immutable, and frozen in development.
        //                     const merged = existing ? existing.slice(0) : [];
        //                     for (let i = 0; i < incoming.length; ++i) {
        //                         merged[offset + i] = incoming[i];
        //                     }
        //                     return merged;
        //                 },
        //             },
        //         },
        //     },
        // },
    }),
    connectToDevTools: true,
});

export default client;
