const UserController = require('./User');
const MovieController = require('./Movie');
const authenticate = require('./Authenticator');
const GenreController = require('./Genre');
const ListController = require('./List');
const StreamingController = require('./Streaming');

module.exports = {
    UserController,
    MovieController,
    GenreController,
    ListController,
    StreamingController,
    authenticate,
};
