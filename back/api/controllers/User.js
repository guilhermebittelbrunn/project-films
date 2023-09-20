const { User } = require("../modules/index");
const bcrypt = require("bcryptjs");
const salt = 10;

const UserController = {
    post: async (req, res) => {
        const newUser = {
            name: "Guilherme",
            email: "admin@teste.com",
            password: bcrypt.hashSync("ZEDchuva123", salt),
            admin: true,
        };
        try {
            await User.create(newUser);
            res.send(`${newUser.name} criado com sucesso`);
        } catch (err) {
            console.log("err", err);
            res.send("error");
        }
    },
};

module.exports = UserController;
