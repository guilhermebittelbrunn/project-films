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
            const isUserAlreadyExist = await User.findAll({ raw: true, where: { email: newUser.email } });
            if (isUserAlreadyExist.length === 0) {
                await User.create(newUser);
                res.send(`${newUser.name} criado com sucesso`);
            }
            throw "user already exist";
        } catch (err) {
            if (err === "user already exist") {
                return res.send("E-mail já em uso");
            }
            res.send("error");
        }
    },
    postLogin: async (req, res) => {
        // const { email, password } = req;

        const test = {
            email: "admin@teste.com",
            senha: "ZEDchuva123",
        };

        try {
            const user = await User.findOne({
                raw: true,
                where: {
                    email: test.email,
                },
            });
            if (bcrypt.compareSync(test.senha, user.password)) {
                return res.send(`Bem-vindo ${user.name}`);
            }
            throw "error";
        } catch (error) {
            console.log(error);
            res.send("E-mail ou senha incorretos");
        }

        // res.send(user);
        // console.log(User);
    },
};

module.exports = UserController;
