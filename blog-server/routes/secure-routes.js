const express = require('express');
const router = express.Router();

router.get(
    '/profile',
    (req, res, next) => {
        console.log('get');
        res.json({
            message: 'Secure route!',
            user: req.user,
            token: req.query.secret_token
        })
    }
);

router.get(
    '/explore',
    (req, res, next) => {
        res.json({
            message: 'Secure route!',
            user: req.user,
            token: req.query.secret_token
        })
    }
);

module.exports = router;    