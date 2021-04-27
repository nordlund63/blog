const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const user = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,

        }
    },
        {
            timestamps: false,
            classMethods: {
                isValidPassword: async function (password) {
                    console.log('isValidPw');
                    const user = this;
                    const compare = await bcrypt.compare(password, user.password);

                    return compare;
                }
            },
            associate: (models) => {
                User.hasMany(models.Posts, { onDelete: 'CASCADE' });
                User.hasMany(models.Comments, { onDelete: 'CASCADE' });
            }
        }
    );

    user.hook('beforeCreate', async function (user, options, callback) {
        try {
            const hash = await bcrypt.hash(this.password, 10);
    
            this.password = hash;
            return callback(null, user);
        }
        catch (err) {
            console.log(err);
            return callback(err, null);
        }
    });
    
    return User;
};



const User = module.exports = user;
// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     }
//     // picture: {
//     //     data: Buffer,
//     //     contentType: String,
//     //     required: false
//     // }
// });

// UserSchema.pre(
//     'save',
//     async function (next) {
//         try {
//             const user = this;
//             const hash = await bcrypt.hash(this.password, 10);

//             this.password = hash;
//             next();
//         }
//         catch (err) {
//             console.log(err);
//             next(err);
//         }
//     }
// );

// UserSchema.methods.isValidPassword = async function (password) {
//     console.log('isValidPw');
//     const user = this;
//     const compare = await bcrypt.compare(password, user.password);

//     return compare;
// }

// const User = module.exports = mongoose.model('user', UserSchema);