const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');

require('./auth/auth');

const port = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

process.env.NODE_ENV === "development"

app.use('/', require('./routes/public-routes'));

if (process.env.NODE_ENV === "development") {
}
else{
    //app.use('/post', require('./routes/post-routes'));
    app.use('/post', passport.authenticate('jwt', {session: false}), require('./routes/post-routes'));
}

app.use((err, req, res, next) => {
    if (res.headersSent) return next(err);
    res.status(400).json({ err: err });
});

const server = app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});