const {User} = require('./user');

const db = {
	User
};

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  module.exports = db;