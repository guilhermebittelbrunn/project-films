const { User } = require("../modules/index");
const bcrypt = require("bcryptjs");
const salt = 10;

const UserController = {
    post: async (req, res) => {
        // const newUser = {
        //     name: "Guilherme",
        //     email: "admin@teste.com",
        //     password: bcrypt.hashSync("ZEDchuva123", salt),
        //     admin: true,
        // };
        // try {
        //     const isUserAlreadyExist = await User.findAll({ raw: true, where: { email: newUser.email } });
        //     if (isUserAlreadyExist.length === 0) {
        //         await User.create(newUser);
        //         res.send(`${newUser.name} criado com sucesso`);
        //     }
        //     throw "user already exist";
        // } catch (err) {
        //     if (err === "user already exist") {
        //         return res.send("E-mail já em uso");
        //     }
        //     res.send("error");
        // }
        console.log(req, body);
    },
    postLogin: async (req, res) => {
        const { email, password } = req.body;
        console.log(email, password);
        try {
            const user = await User.findOne({
                raw: true,
                where: { email },
            });
            if (user) {
                if (bcrypt.compareSync(password, user.password)) {
                    const { password, ...rest } = user;
                    return res.status(200).send(JSON.stringify(rest));
                }
            }
            throw 403;
        } catch (error) {
            console.log(error);
            return res.status(403).send("not found");
        }

        // res.send(user);
        // console.log(User);
    },
};

module.exports = UserController;
