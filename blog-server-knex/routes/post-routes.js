const express = require('express');
const router = express.Router();
const UsersService = require('../models/UsersService');
const PostsService = require('../models/PostsService');

router.get(
    '/',
    async (req, res, next) => {
        try {
            console.log('thing')
            const offset = (req.query.page - 1) * 10;
            await PostsService.getPaginationPosts(req.query.paginationCount, offset)
                .then(result => {
                    res.json({
                        posts: result,
                        token: req.query.secret_token
                    })
                })
                .catch((err) => {
                    throw(err);
                });
        }
        catch (err) {
            console.log(err);
            res
                .status(500)
                .json({ success: false, msg: `Something went wrong. ${err}` });
        }
    }
)

router.get(
    '/:id',
    async(req, res, next) => {
        try {
            console.log(req.params)
            await PostsService.getPost(req.params.id)
                .then(result => {
                    res.json({
                        post: result,
                        token: req.query.secret_token
                    })
                })
                .catch((err) => {
                    throw(err);
                });
        }
        catch (err) {
            console.log(err);
            res
                .status(500)
                .json({ success: false, msg: `Something went wrong. ${err}` });
        }
    }
);

router.get(
    '/count',
    async (req, res, next) => {
        try {
            await PostsService.getPostCount()
                .then(result => {
                    res.json({
                        count: result.count,
                        token: req.query.secret_token
                    })
                    
                })
                .catch((err) => {
                    throw(err);
                });
        }
        catch (err) {
            console.log(err);
            res
                .status(500)
                .json({ success: false, msg: `Something went wrong. ${err}` });
        }
    }
)

router.post(
    '/createpost',
    async (req, res, next) => {
        console.log("in post")
        try {
            console.log(req.user);
            const newPost = {
                title: req.body.title,
                content: req.body.content,
                userId: req.user.id
            };
            await PostsService.insertPost(newPost)
                .then((result) => {
                    res.json({
                        user: req.user,
                        token: req.query.secret_token
                    })
                    res.redirect('/explore');
                })
                .catch((err) => {
                   throw(err);
                });
        }
        catch (err) {
            console.log(err);
            res
                .status(500)
                .json({ success: false, msg: `Something went wrong. ${err}` });
        }
    }
);

module.exports = router;