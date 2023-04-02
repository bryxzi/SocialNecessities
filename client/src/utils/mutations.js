import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($body: String!, $tags: [String!], $isPrivate: Boolean) {
    createPost(body: $body, tags: $tags, isPrivate: $isPrivate) {
      id
      body
      tags
      isPrivate
      username
      createdAt
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export const LIKE_POST = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
        createdAt
      }
    }
  }
`;
