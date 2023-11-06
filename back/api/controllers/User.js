const { User, List, Movie, Streaming } = require('../modules/index');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const colors = require('colors');
const { Op } = require('sequelize');

const UserController = {
    post: async (req, res) => {
        const { name, email, password, movies, streamings } = req.body;
        const listIdByMovie = movies.map((movie) => movie.id);
        const listIdByStreaming = streamings.map((movie) => movie.id);
        try {
            const crypetedPassword = bcrypt.hashSync(password);
            const newUser = await User.create({ name, email, password: crypetedPassword });
            const newList = await List.create({ name: 'favorites', idUser: newUser.id });
            const listMovies = await Movie.findAll({
                where: {
                    id: {
                        [Op.in]: listIdByMovie,
                    },
                },
            });
            const listStreamings = await Streaming.findAll({
                where: {
                    id: {
                        [Op.in]: listIdByStreaming,
                    },
                },
            });
            listMovies.forEach((movie) => {
                movie.setLists(newList);
            });
            listStreamings.forEach((streaming) => {
                streaming.setUsers(newUser);
            });

            res.status(201).send({ message: 'user created succesfully', userName: newUser.dataValues.name });
        } catch (err) {
            console.log(err);
            res.send(err);
        }

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
                where: { email },
                include: {
                    model: Streaming,
                    required: false,
                    // through: [''],
                    attributes: { exclude: ['json'] },
                },
            });
            console.log(user);
            if (!user) {
                throw 'e-mail or password incorrect';
            }
            if (bcrypt.compareSync(password, user.dataValues.password)) {
                const { password, ...userData } = user.dataValues;
                const secret = process.env.JWT_TOKEN_SECRET;
                const jwt = JWT.sign({ id: user.id }, secret, { expiresIn: 600 });
                // res.header('Access-Control-Expose-Headers', 'Authorization-Token');
                // res.header('Authorization-Token', JSON.stringify(jwt));
                return res.status(200).send({ userData: userData, token: JSON.stringify(jwt) });
            }
            throw 400;
        } catch (error) {
            console.log(error);
            return res.status(400).send({ msg: 'password or email is incorret', error });
        }
    },
    get: async (req, res) => {
        const { id } = req.params;
        const token = req.header('authorization-token');
        const parsedToken = JSON.parse(atob(token.split('.')[1]));
        try {
            if (parsedToken.id !== id) {
                throw 'access denied, token id is not the same as id paramam';
            }
            const user = await User.findByPk(id, {
                include: {
                    model: Streaming,
                    required: true,
                    through: [''],
                    attributes: { exclude: ['json'] },
                },
            });
            if (user) {
                const { password, ...userData } = user.dataValues;
                return res.status(200).send(userData);
            }
            throw 'uset not found';
        } catch (error) {
            return res.status(403).send({ msg: 'an error occoured to get information about user', error });
        }
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
