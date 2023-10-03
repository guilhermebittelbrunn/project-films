const Movie = require("../modules/Movie");
const Streaming = require("../modules/Streaming");
const Genre = require("../modules/Genre");
const path = require("path");

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
        const idGenre = 878;

        try {
            const movies = await Movie.findAll({
                attributes: { exclude: ["json"] },
                include: [
                    {
                        model: Genre,
                        required: true,
                        through: "movieGenre",

                        where: {
                            id: idGenre,
                        },
                    },
                    // {
                    //     model: Genre,
                    //     required: true,
                    //     // through: "",
                    //     as: "otherGenres",
                    // },
                ],
                order: [["score_popularity", "DESC"]],
                limit: 20,
            });

            if (movies === null) {
                throw "Filmes não encontrados";
            }
            res.send(movies);
        } catch (error) {
            res.send(error);
        }
    },
    getProvider: async (req, res) => {
        const Streamings = await Streaming.findAll({ raw: true });
        const teste = Streamings.map((stmg) => {
            const bff = Buffer.from(path.join(__dirname, `../../public/${stmg.icon_path}`).toString("base64"));
            // const pathIMG = path.join(__dirname, `../../public/${stmg.icon_path}`);
            return { ...stmg, path: bff };
        });
        // const imgPATH = ;
        // res.sendFile(imgPATH);

        res.send(teste);
    },
    getProviderrr: async (req, res) => {
        const teste = path.join(__dirname, `../../public/Netflix.jpg`);
        res.sendFile(teste);
    },
};

module.exports = MovieController;
