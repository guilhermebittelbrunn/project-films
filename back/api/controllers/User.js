const { User, List, Movie, Streaming } = require('../modules/index');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const colors = require('colors');
const { Op, where } = require('sequelize');

const UserController = {
    post: async (req, res) => {
        const { name, email, password, movies, streamings } = req.body;
        const listIdByMovie = movies.map((movie) => movie.id);
        const listIdByStreaming = streamings.map((movie) => movie.id);
        try {
            const crypetedPassword = bcrypt.hashSync(password);
            const newUser = await User.create({ name, email, password: crypetedPassword });
            const defaultLists = [
                { name: 'Favoritos', idUser: newUser.id },
                { name: 'Assistir mais tarde', idUser: newUser.id },
                { name: 'Assistidos', idUser: newUser.id },
            ];
            const newList = await List.bulkCreate(defaultLists);
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
            newList[0].setMovies(listMovies);
            newUser.setStreamings(listStreamings);
            res.status(201).send({ message: 'user created succesfully', userName: newUser.dataValues.name });
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    },
    postLogin: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({
                where: { email },
                include: [
                    {
                        model: Streaming,
                        required: false,
                        attributes: { exclude: ['json'] },
                    },
                    {
                        model: List,
                        required: false,
                        include: [
                            {
                                model: Movie,
                                required: false,
                                attributes: { exclude: ['json'] },
                            },
                        ],
                    },
                ],
            });
            if (!user) {
                throw 'e-mail or password incorrect';
            }
            if (bcrypt.compareSync(password, user.dataValues.password)) {
                const { password, ...userData } = user.dataValues;
                const secret = process.env.JWT_TOKEN_SECRET;
                const jwt = JWT.sign({ id: user.id }, secret, { expiresIn: 6000 });
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
                include: [
                    {
                        model: Streaming,
                        required: false,
                        attributes: { exclude: ['json'] },
                    },
                    {
                        model: List,
                        required: false,
                        include: [
                            {
                                model: Movie,
                                required: false,
                                attributes: { exclude: ['json'] },
                            },
                        ],
                    },
                ],
            });
            if (user) {
                const { password, ...userData } = user.dataValues;
                return res.status(200).send(userData);
            }
            throw 'user not found';
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
    put: async (req, res) => {
        const { id } = req.params;
        const { name, email } = req.query;
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        try {
            const user = await User.findByPk(id, {
                include: [
                    {
                        model: List,
                        required: false,
                        include: [
                            {
                                model: Movie,
                                required: false,
                                attributes: { exclude: ['json'] },
                            },
                        ],
                    },
                    {
                        model: Streaming,
                        required: true,
                        attributes: { exclude: ['json'] },
                    },
                ],
            });
            if (String(name).trim() !== '') {
                user.name = name;
                await user.save();
            }
            if (email !== user.email) {
                const isEmailAlreadyExists = await User.findOne({ where: { email } });
                if (user.email === email) {
                    return;
                }
                if (user.email !== email && isEmailAlreadyExists) {
                    throw 'e-mail already in use';
                }
                if (!regex.test(email)) {
                    throw 'email is not a valid email';
                }
                user.email = email;
                await user.save();
            }
            const { password, ...userInformation } = user.dataValues;
            res.send({ user: userInformation });
        } catch (error) {
            console.log(error);
            res.send({ msg: 'error occurred saving information about user', error });
        }
    },
};

module.exports = UserController;
