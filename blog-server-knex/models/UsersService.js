const db = require('../data/db-config.js');
const bcrypt = require('bcrypt');

const UsersService = {
    async insertUser(newUser) {
        try{
            newUser.password = await bcrypt.hash(newUser.password, 10);
            return db('users').insert(newUser);
        }
        catch(err){
            console.log(err);
        }
        
    },
    async findUserByEmail(user) {
        try{
            const result = await db('users').where({email: user.email}).first().then((row) => row);
            return result;
        }
        catch(err){
            console.log(err);
        }
        
    },
    async findUserById(id) {
        try{
            const result = await db('users').where({id: id}).first().then((row) => row);
            return result;
        }
        catch(err){
            console.log(err);
        }
        
    }
};

module.exports = UsersService;