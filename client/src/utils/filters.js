export const filterPostsByKeyword = (posts, keyword) => {
    return posts.filter((post) => post.body.toLowerCase().includes(keyword.toLowerCase()));
  };
  
  export const filterPostsByDate = (posts, order = 'desc') => {
    return posts.sort((a, b) => {
      if (order === 'asc') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
  };
  
  export const filterPostsByTags = (posts, tags) => {
    return posts.filter((post) => tags.every((tag) => post.tags.includes(tag)));
  };
  
  export const filterPostsByLikes = (posts, order = 'desc') => {
    return posts.sort((a, b) => {
      if (order === 'asc') {
        return a.likes.length - b.likes.length;
      } else {
        return b.likes.length - a.likes.length;
      }
    });
  };
  