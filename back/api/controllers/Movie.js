const Movie = require("../modules/Movie");
const Streaming = require("../modules/Streaming");
const Genre = require("../modules/Genre");
const path = require("path");
const fs = require("fs");

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
                    exclude: ["json"],
                },
                include: [
                    {
                        model: Streaming,
                        required: false,
                        through: [""],
                        attributes: { exclude: ["json"] },
                    },
                    {
                        model: Genre,
                        required: false,
                        // attributes: ["name"],
                        through: [""],
                        attributes: { exclude: ["json"] },
                    },
                ],
            });

            if (movie === null) {
                throw "Filme não encontrado";
            }
            res.send(movie);
        } catch (error) {
            res.send(error);
        }
    },
    getByGenres: async (req, res) => {
        try {
            const movies = await Movie.findAll({
                attributes: ["id", "title", "sinopse", "poster_path", "backdrop_path", "score_popularity"],
                include: [
                    {
                        model: Genre,
                        required: false,
                        through: [""],
                        attributes: { exclude: ["json"] },
                    },
                ],
                limit: 300,
                raw: true,
                order: [["score_popularity", "desc"]],
            });
            const moviesByGenre = movies.reduce((acc, movie) => {
                if (!acc[movie["genres.name"]]) {
                    acc[movie["genres.name"]] = [];
                }
                acc[movie["genres.name"]].push(movie);
                return acc;
            }, {});
            for (let key in moviesByGenre) {
                moviesByGenre[key] = shuffle(moviesByGenre[key]);
            }
            res.send(moviesByGenre);
        } catch (error) {
            console.log(error);
            res.send({ msg: "Erro ao buscar os filmes", err: error });
        }
    },
    getMostPopular: async (req, res) => {
        try {
            const movies = await Movie.findAll({
                limit: 78,
                raw: true,
                order: [["score_popularity", "desc"]],
            });
            res.send(movies);
        } catch (error) {
            res.send(error);
        }
    },
};

module.exports = MovieController;
