const UserController = require('./User');
const MovieController = require('./Movie');
const authenticate = require('./Authenticator');
const GenreController = require('./Genre');

module.exports = { UserController, MovieController, GenreController, authenticate };
