const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    // picture: {
    //     data: Buffer,
    //     contentType: String,
    //     required: false
    // }
});

UserSchema.pre(
    'save',
    async function (next) {
        try {
            const user = this;
            const hash = await bcrypt.hash(this.password, 10);

            this.password = hash;
            next();
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    }
);

UserSchema.methods.isValidPassword = async function (password) {
    console.log('isValidPw');
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
}

const User = module.exports = mongoose.model('user', UserSchema);