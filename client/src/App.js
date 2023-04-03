import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import LoginPage from './pages/UserAuth/LoginPage';
import SignupPage from './pages/UserAuth/SignupPage';
import CreatePostPage from './pages/Posts/CreatePostPage';
import EditPostPage from './pages/Posts/EditPostPage';
import PostDetailsPage from './pages/Posts/PostDetailsPage';
import PublicPostsPage from './pages/Posts/PublicPostsPage';
import Header from './components/DeletePost';


// Create the Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
      <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/edit-post/:id" element={<EditPostPage />} />
          <Route path="/post/:id" element={<PostDetailsPage />} />
          <Route path="/" element={<PublicPostsPage />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;
