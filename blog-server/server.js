const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize');
//const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./auth/auth');
//const User = require('./models/user');

const config = require('./config/db');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3001;

// mongoose.connect(config.db, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// });
// mongoose.connection.on('error', error => console.log(error) );
const sequelize = new Sequelize('postgres://postgres:pw@localhost:5432/blog'); // Example for postgres
var User = sequelize.define('user', {
    username: Sequelize.STRING,
    birthday: Sequelize.DATE
});
sequelize.sync().then(function () {
    return User.create({
        username: 'janedoe',
        birthday: new Date(1980, 6, 20)
    });
}).then(function (jane) {
    console.log(jane.get({
        plain: true
    }));
});
// let db = mongoose.connection;

// db.on('open', () => {
//     console.log('Connected to the database.');
// });

// db.on('error', (err) => {
//     console.log(`Database error: ${err}`);
// });

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
//app.use(express.urlencoded({ extended: true }));

// app.use('/', require('./routes/public-routes'));
// app.use('/user', passport.authenticate('jwt', {session: false}), require('./routes/secure-routes'));
// app.use('/post', passport.authenticate('jwt', {session: false}), require('./routes/post-routes'));

app.use((err, req, res, next) => {
    if (res.headersSent) return next(err);
    res.status(400).json({ err: err });
});

const server = app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});