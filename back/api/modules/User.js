const { db, DataTypes, Sequelize } = require("../../database/sequelize");
const Streaming = require("./Streaming");
const List = require("./List");

const User = db.define("User", {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

User.belongsToMany(Streaming, {
    through: "userStreaming",
    foreignKey: "idUser",
    constraints: true,
});

Streaming.belongsToMany(User, {
    through: "userStreaming",
    foreignKey: "idStreaming",
    constraints: true,
});

List.belongsTo(User, {
    foreignKey: {
        name: "idUser",
        allowNull: false,
    },
    constraints: true,
});

module.exports = User;
