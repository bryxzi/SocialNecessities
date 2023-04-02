import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      id
      body
      tags
      isPrivate
      username
      createdAt
      likes {
        id
        username
        createdAt
      }
    }
  }
`;

export const GET_POST = gql`
  query GetPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      tags
      isPrivate
      username
      createdAt
      likes {
        id
        username
        createdAt
      }
    }
  }
`;
