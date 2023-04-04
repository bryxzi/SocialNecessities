import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import 'semantic-ui-css/semantic.min.css'
import './index.css';

import App from './App';

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_API_URL || 'http://localhost:3000/graphql',

});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

const root = createRoot(document.getElementById('root'));

root.render (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
);

