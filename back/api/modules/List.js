const { db, DataTypes } = require("../../database/sequelize");

const List = db.define("Lists", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
});

module.exports = List;
