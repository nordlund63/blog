const db = require('../data/db-config.js');

const PostsService = {
    async insertPost(newPost) {
        return db('posts').insert(newPost);
    },

    async getPaginationPosts(count, offset) {
        return db.select('posts.id as postId', 'users.id as userId',  'posts.title', 'users.email', 'posts.created_at')
        .from('posts').innerJoin('users', 'users.id', 'posts.userId')
        .orderBy('created_at', 'desc').limit(count).offset(offset);
    },

    async getPostCount() {
        return db('posts').count().first();
    },
};

module.exports = PostsService;