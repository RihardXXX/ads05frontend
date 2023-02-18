import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: process.env.REACT_APP_URI,
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

export default client;
