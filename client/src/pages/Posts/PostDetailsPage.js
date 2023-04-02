import React, { useState, useEffect } from 'react';

const PostDetailsPage = ({ match }) => {
  const postId = match.params.id;
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Fetch the post using postId and GraphQL query, then update the state with the post data.
  }, [postId]);

  return (
    <div className="post-details-page">
      {post ? (
        <>
          <h2>{post.body}</h2>
          <p>Tags: {post.tags.join(', ')}</p>
          <p>Posted by: {post.author.username}</p>
          <p>Created at: {post.createdAt}</p>
          {/* Add more post details as needed */}
        </>
      ) : (
        <p>Loading post...</p>
      )}
    </div>
  );
};

export default PostDetailsPage;
