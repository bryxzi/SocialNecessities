import React, { useState, useEffect } from 'react';
import PostList from '../../components/Post/PostList';

const PublicPostsPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch public posts using GraphQL query and update the state with the fetched posts.
  }, []);

  return (
    <div className="public-posts-page">
      <h2>Public Posts</h2>
      <PostList posts={posts} />
    </div>
  );
};

export default PublicPostsPage;
