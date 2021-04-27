const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post(
    '/login',
    async (req, res, next) => {
      console.log('Before auth');
      passport.authenticate(
        'login',
        async (err, user, info) => {
          try {
            if (err) {
              const error = new Error('An error occurred.');
              return next(error); 
            }
            if(info && (info.statusCode === 401 || info.statusCode === 404)){
              console.log(info);
              res.status(info.statusCode);
              return res.send();
            }

            console.log('login');
  
            req.login(
              user,
              { session: false },
              async (error) => {
                if (error) return next(error);
  
                const body = { _id: user._id, name: user.name };
                const token = jwt.sign({ user: body }, 'TOP_SECRET');
  
                res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 3600000 });
                res.setHeader('Authorization', 'Bearer '+ token); 
                
                return res.json({ token });
              }
            );
          } catch (error) {
            console.log(error);
            return next(error);
          }
        }
      )(req, res, next);
    }
  );

router.post('/register', 
    passport.authenticate('register', {session: false}), 
    async(req, res, next) => {
        res.json({
            message: 'Registration successful',
            user: req.user
        });
});

module.exports = router;