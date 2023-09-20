const { db } = require("../../database/sequelize");
const Movie = require("./Movie");
const Genre = require("./Genre");
const Streaming = require("./Streaming");
const User = require("./User");
const List = require("./List");

(async () => {
    try {
        await db.sync();
        console.log("database connection successfuly");
    } catch (err) {
        throw err;
    }
})();

module.exports = { Movie, Genre, Streaming, User, List };
