import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginPage from './pages/UserAuth/LoginPage';
import SignupPage from './pages/UserAuth/SignupPage';
import CreatePostPage from './pages/Posts/CreatePostPage';
import EditPostPage from './pages/Posts/EditPostPage';
import PostDetailsPage from './pages/Posts/PostDetailsPage';
import PublicPostsPage from './pages/Posts/PublicPostsPage';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/create-post" component={CreatePostPage} />
        <Route exact path="/edit-post/:id" component={EditPostPage} />
        <Route exact path="/post/:id" component={PostDetailsPage} />
        <Route exact path="/" component={PublicPostsPage} />
      </Switch>
    </Router>
  );
};

export default App;
