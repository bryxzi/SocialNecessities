import React, { useState } from 'react';

const CreatePostPage = () => {
  const [post, setPost] = useState({ body: '', tags: '', isPrivate: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPost({ ...post, [name]: checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform post creation using GraphQL mutation and redirect to the appropriate page.
  };

  return (
    <div className="create-post-page">
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="body">Body</label>
          <textarea
            name="body"
            id="body"
            value={post.body}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            id="tags"
            value={post.tags}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="isPrivate">Private</label>
          <input
            type="checkbox"
            name="isPrivate"
            id="isPrivate"
            checked={post.isPrivate}
            onChange={handleCheckboxChange}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePostPage;
