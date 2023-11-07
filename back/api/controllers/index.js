const UserController = require('./User');
const MovieController = require('./Movie');
const authenticate = require('./Authenticator');
const GenreController = require('./Genre');
const ListController = require('./List');

module.exports = { UserController, MovieController, GenreController, ListController, authenticate };
