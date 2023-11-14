const { Movie, Genre, List } = require('../modules/index');
const Streaming = require('../modules/Streaming');
const { Op } = require('sequelize');

const MovieController = {
    get: async (req, res) => {
        const { id } = req.params;
        const { idUser, raw } = req.query;
        try {
            const movie = await Movie.findByPk(id, {
                raw: raw,
                attributes: {
                    exclude: ['json'],
                },
                include: [
                    {
                        model: Streaming,
                        required: false,
                        through: [''],
                        attributes: { exclude: ['json'] },
                    },
                    {
                        model: Genre,
                        required: false,
                        through: [''],
                        attributes: { exclude: ['json'] },
                    },
                    {
                        model: List,
                        required: false,
                        where: {
                            idUser,
                        },
                    },
                ],
            });

            if (!movie) throw { msg: 'Filme não encontrado', error: msg };
            res.send(movie);
        } catch (error) {
            res.send(error);
        }
    },
    getAll: async (req, res) => {
        const { limit, title, genres, streamings, listIdApi, raw } = req.query;
        console.log({ limit, title, genres, streamings, listIdApi, raw });

        const whereCondition = {};

        const includeGenre = {
            model: Genre,
            required: genres && JSON.parse(genres).length > 0,
        };

        const includeStreaming = {
            model: Streaming,
            required: streamings && JSON.parse(streamings).length > 0,
            attributes: { exclude: ['json'] },
        };

        if (title) {
            whereCondition.title = {
                [Op.like]: `%${title}%`,
            };
        }
        if (listIdApi) {
            whereCondition.idAPI = {
                [Op.in]: JSON.parse(listIdApi),
            };
        }

        if (streamings) {
            includeStreaming.where = {
                id: {
                    [Op.in]: streamings ? JSON.parse(streamings) : [''],
                },
            };
        }

        if (genres) {
            includeGenre.where = {
                id: {
                    [Op.in]: genres ? JSON.parse(genres) : [''],
                },
            };
        }

        try {
            const movies = await Movie.findAll({
                limit: +limit || 100,
                attributes: { exclude: ['json'] },
                order: [['score_popularity', 'desc']],
                raw: raw,
                where: whereCondition,
                include: [includeGenre, includeStreaming],
            });

            console.log('movies.length', movies.length);
            res.send(movies);
        } catch (error) {
            res.send(error);
        }
    },
};

module.exports = MovieController;
