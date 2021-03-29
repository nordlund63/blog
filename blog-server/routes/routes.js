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
            if (err || !user) {
              const error = new Error('An error occurred.');
  
              return next(error);
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
            return next(error);
          }
        }
      )(req, res, next);
    }
  );

router.post('/signup', 
    passport.authenticate('signup', {session: false}), 
    async(req, res, next) => {
        console.log('Signup route');
        res.json({
            message: 'Sign up successful',
            user: req.user
        });
});

module.exports = router;