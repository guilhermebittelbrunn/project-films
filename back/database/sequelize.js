const { Sequelize, DataTypes } = require('sequelize');
const colors = require('colors');

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './database/database.sqlite',
    logging: (text) => {
        console.log('-----------------------------------------------'.green);
        console.log(colors.yellow(text));
    },
    define: {
        freezeTableName: true,
    },
});

module.exports = { db, DataTypes, Sequelize };
