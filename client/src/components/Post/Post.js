import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  return (
    <div className="post">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <div className="post-tags">
        {post.tags.map((tag, index) => (
          <span key={index}>{tag}</span>
        ))}
      </div>
      <Link to={`/post/${post.id}`}>Read More</Link>
    </div>
  );
};

export default Post;
