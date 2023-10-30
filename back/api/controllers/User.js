const { User } = require('../modules/index');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const salt = 10;

const UserController = {
    post: async (req, res) => {
        console.log(req.body);
        res.send(req.body);
        // const newUser = {
        //     name: 'Guilherme',
        //     email: 'admin@teste.com',
        //     password: bcrypt.hashSync('ZEDchuva123', salt),
        //     admin: true,
        // };
        // try {
        //     const isUserAlreadyExist = await User.findOne({ raw: true, where: { email: newUser.email } });
        //     console.log(isUserAlreadyExist);
        //     if (!isUserAlreadyExist) {
        //         await User.create(newUser);
        //         res.send(`${newUser.name} criado com sucesso`);
        //     }
        //     throw 'user already exist';
        // } catch (err) {
        //     if (err === 'user already exist') {
        //         return res.send('E-mail já em uso');
        //     }
        //     res.send('error');
        // }
    },
    postLogin: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({
                raw: true,
                where: { email },
            });
            if (!user) {
                throw 'e-mail or password incorrect';
            }
            if (bcrypt.compareSync(password, user.password)) {
                const { password, ...userData } = user;
                const secret = process.env.JWT_TOKEN_SECRET;
                const jwt = JWT.sign({ id: user.id }, secret, { expiresIn: 120 });
                // res.header('Access-Control-Expose-Headers', 'Authorization-Token');
                // res.header('Authorization-Token', JSON.stringify(jwt));
                return res.status(200).send({ userData: userData, token: JSON.stringify(jwt) });
            }
            throw 400;
        } catch (error) {
            console.log(error);
            return res.status(400).send('access denied');
        }
    },
    get: async (req, res) => {
        const { id } = req.params;
        const user = await User.findByPk(id, { raw: true });
        if (user) {
            const { password, ...userData } = user;
            return res.status(200).send(userData);
        }
        return res.status(400).send("user doesn't exist");
    },
    getByEmail: async (req, res) => {
        const { email } = req.query;
        const user = await User.findOne({ where: { email }, raw: true });
        if (user) {
            return res.status(226).send('e-mail already in use');
        }
        res.status(200).send(true);
    },
    test: (req, res) => {
        res.send({ ok: true });
    },
};

module.exports = UserController;
