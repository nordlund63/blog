const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UsersService = require('../models/UsersService');
const bcrypt = require('bcrypt');

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use('register',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try{
                const user = await UsersService.insertUser({email, password});
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
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try{
                const user = await UsersService.findUserByEmail({email});
                if(!user){
                    return done(null, false, { statusCode: 404, message: 'User not found'});
                }
                const validate = await isValidPassword(password, user);
                if(!validate){
                    return done(null, false, {statusCode: 401, message: 'Wrong password'});
                }
                return done(null, user, {message: 'Logged in Successfully'});
            }
            catch(err){
                console.log(err);
                done(err);
            }
        }
    )
);

passport.use(
    new JWTstrategy(
        {
            secretOrKey: 'TOP_SECRET',
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },
        async (token, done) => {
            try{
                const user = await UsersService.findUserById(token.id);
                return done(null, user);
            }
            catch(err){
                return done(err);
            }
        }
    )
);

async function isValidPassword(password, user) {
    const compare = await bcrypt.compare(password, user.password);

    return compare;
}