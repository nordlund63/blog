const express = require('express');
const router = express.Router();

const Post = require('../models/post');
const User = require('../models/user');

router.post(
    '/createpost',
    (req, res, next) => {
        const currentUser = User.findById({ id: req.user.id });
        try {
            const newPost = new Post({
                user: currentUser,
                title: req.body.title,
                content: req.body.content
                //tags: req.body.tags.map(e => new Tag({name: e.name}))
            });
            newPost.save()
                .then((result) => {
                    res.json({
                        message: 'Secure route!',
                        user: req.user,
                        token: req.query.secret_token
                    })
                })
                .catch((err) => {
                    console.log(err);
                    res
                        .status(500)
                        .json({ success: false, msg: `Something went wrong. ${err}` });
                });
        }
        catch (err) {
            console.log(err);
        }



    }
);

module.exports = router;