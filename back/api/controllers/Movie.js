// const Movie = require('../modules/Movie');
// const Streaming = require('../modules/Streaming');
// const Genre = require('../modules/Genre');
const { Movie, Genre } = require('../modules/index');
const Streaming = require('../modules/Streaming');
const { Op, json } = require('sequelize');
const path = require('path');
const fs = require('fs');
const Colors = require('colors');

function shuffle(array) {
    var m = array.length,
        t,
        i;

    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

const MovieController = {
    get: async (req, res) => {
        const { id } = req.params;
        try {
            const movie = await Movie.findByPk(id, {
                // raw: true,
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
                        // attributes: ["name"],
                        through: [''],
                        attributes: { exclude: ['json'] },
                    },
                ],
            });

            if (movie === null) {
                throw { msg: 'Filme não encontrado', error: msg };
            }

            res.send(movie);
        } catch (error) {
            res.send(error);
        }
    },
    getByGenres: async (req, res) => {
        const { limit, streamings } = req.query;
        try {
            const movies = await Movie.findAll({
                attributes: ['id', 'title', 'sinopse', 'poster_path', 'backdrop_path', 'score_popularity'],
                include: [
                    {
                        model: Genre,
                        required: false,
                        through: [''],
                        attributes: { exclude: ['json'] },
                    },
                    {
                        model: Streaming,
                        required: false,
                        through: [''],
                        attributes: { exclude: ['json'] },
                        where: {
                            id: {
                                [Op.in]: streamings ? JSON.parse(streamings) : [''],
                            },
                        },
                    },
                ],
                limit: +limit || 300,
                raw: true,
                order: [['score_popularity', 'desc']],
            });
            const moviesByGenre = movies.reduce((acc, movie) => {
                if (!acc[movie['genres.name']]) {
                    acc[movie['genres.name']] = [];
                }
                acc[movie['genres.name']].push(movie);
                return acc;
            }, {});
            for (let key in moviesByGenre) {
                moviesByGenre[key] = shuffle(moviesByGenre[key]);
            }
            res.send(moviesByGenre);
        } catch (error) {
            res.send({ msg: 'Erro ao buscar os filmes', err: error });
        }
    },
    getMovieList: async (req, res) => {
        const { limit, title, genres, streamings } = req.query;
        try {
            const movies = await Movie.findAll({
                limit: +limit || 70,
                attributes: { exclude: ['json'] },
                // raw: true,
                order: [['score_popularity', 'desc']],
                where: {
                    title: {
                        [Op.like]: `%${title || ''}%`,
                    },
                },
                include:
                    genres || streamings
                        ? [
                              {
                                  model: Genre,
                                  required: JSON.parse(genres).length > 0,
                                  // through: [''],
                                  where: {
                                      id: {
                                          [Op.in]: JSON.parse(genres),
                                      },
                                  },
                              },
                              {
                                  model: Streaming,
                                  required: streamings ? true : false,
                                  // through: [''],
                                  attributes: { exclude: ['json'] },
                                  where: {
                                      id: {
                                          [Op.in]: streamings ? JSON.parse(streamings) : [''],
                                      },
                                  },
                              },
                          ]
                        : null,
            });

            console.log('movies.length', movies.length);
            res.send(movies);
        } catch (error) {
            res.send(error);
        }
    },
};

module.exports = MovieController;
