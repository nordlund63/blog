const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./auth/auth');
const User = require('./models/user');

const config = require('./config/db');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3001;

mongoose.connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});
mongoose.connection.on('error', error => console.log(error) );

let db = mongoose.connection;

db.on('open', () => {
    console.log('Connected to the database.');
});

db.on('error', (err) => {
    console.log(`Database error: ${err}`);
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
//app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/routes'));
app.use('/user', passport.authenticate('jwt', {session: false}), require('./routes/secure-routes'));

app.use((err, req, res, next) => {
    if (res.headersSent) return next(err);
    res.status(400).json({ err: err });
});

const server = app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});