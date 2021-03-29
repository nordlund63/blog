const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use('signup',
    new localStrategy(
        {
            usernameField: 'name',
            passwordField: 'password'
        },
        async (name, password, done) => {
            try{
                const user = await User.create({name, password});
                return done (null, user);
            }
            catch(err){
                done(err);
            }
        }
    )
);

passport.use('login',
    new localStrategy(
        {
            usernameField: 'name',
            passwordField: 'password'
        },
        async (name, password, done) => {
            try{
                console.log('login auth');
                const user = await User.findOne({name});
                if(!user){
                    return done(null, false, {message: 'User not found'});
                }

                const validate = await user.isValidPassword(password);
                if(!validate){
                    return done(null, false, {message: 'Wrong password'});
                }

                return done(null, user, {message: 'Logged in Successfully'});
            }
            catch(err){
                done(err);
            }
        }
    )
);

passport.use(
    new JWTstrategy(
        {
            secretOrKey: 'TOP_SECRET',
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken('secret_token')
        },
        async (token, done) => {
            try{
                return done(null, token.user);
            }
            catch(err){
                done(err);
            }
        }
    )
);