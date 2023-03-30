const bcrypt = require('bcryptjs');
const { UserInputError, AuthenticationError } = require('apollo-server-express');
const { Post, User } = require('../models');
const { checkAuth, generateToken } = require('../auth/auth');

const resolvers = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({ createdAt: -1 });
                return posts;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getPost(_, { postId }) {
            try {
                const post = await Post.findById(postId);
                if (post) {
                    return post;
                } else {
                    throw new Error('Post not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        },
    },
    Mutation: {
        async register(_, { registerInput: { username, email, password, confirmPassword } }) {
            // Validate user data
            if (username.trim() === "") {
                throw new UserInputError("Username must not be empty");
            }
            if (email.trim() === "") {
                throw new UserInputError("Email must not be empty");
            }
            if (password.trim() === "") {
                throw new UserInputError("Password must not be empty");
            }
            if (password !== confirmPassword) {
                throw new UserInputError("Passwords do not match");
            }

            // Make sure user doesn't already exist
            const user = await User.findOne({ username });
            if (user) {
                throw new UserInputError("Username is taken", {
                    errors: {
                        username: "This username is taken",
                    },
                });
            }


            // Hash password and create an auth token
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString(),
            });

            const res = await newUser.save();

            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token,
            };
        },
        async login(_, { username, password }) {
            const user = await User.findOne({ username });
            if (!user) {
                throw new UserInputError('User not found', { errors: { username: 'User not found' } });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                throw new UserInputError('Wrong credentials', { errors: { password: 'Wrong credentials' } });
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token,
            };
        },
        async createPost(_, { body, tags, isPrivate }, context) {
            const user = checkAuth(context);

            if (body.trim() === '') {
                throw new UserInputError('Post body must not be empty');
            }

            const newPost = new Post({
                body,
                tags,
                isPrivate,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString(),
            });

            const post = await newPost.save();
            return post;
        },
        async deletePost(_, { postId }, context) {
            const user = checkAuth(context);

            try {
                const post = await Post.findById(postId);
                if (user.username === post.username) {
                    await post.delete();
                    return 'Post deleted successfully';
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch (err) {
                throw new Error(err);
            }
        },
        async likePost(_, { postId }, context) {
            const { username } = checkAuth(context);

            const post = await Post.findById(postId);
            if (post) {
                if (post.likes.find((like) => like.username === username)) {
                    // Post already liked, unlike it
                    post.likes = post.likes.filter((like) => like.username !== username);
                } else {
                    // Not liked, like post
                    post.likes.push({
                        username,
                        createdAt: new Date().toISOString(),
                    });
                }
                await post.save();
                return post;
            } else {
                throw new UserInputError("Post not found");
            }
        },
    },
};

module.exports = resolvers;