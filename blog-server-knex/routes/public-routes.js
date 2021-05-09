const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const UsersService = require('../models/UsersService');

router.post('/register',
    passport.authenticate('register', { session: false }),
    async (req, res, next) => {
        res.json({
            message: 'Registration successful',
            user: req.user
        });
    });

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
          
                req.login(
                  user,
                  { session: false },
                  async (error) => {
                    if (error) return next(error);
                    console.log(user);
                    const token = jwt.sign(user, 'TOP_SECRET', { expiresIn: 86400 * 30 });
                    res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 3600000 });
                    res.setHeader('Authorization', 'Bearer'+ token); 
                    
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

module.exports = router;