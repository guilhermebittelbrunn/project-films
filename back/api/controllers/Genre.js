const { Genre } = require('../modules/index');

const GenreController = {
    get: async (req, res) => {
        const { id } = req.params;
        try {
            const genre = await Genre.findByPk(id, {
                raw: true,
            });
            res.send(genre);
        } catch (error) {
            res.send(error);
        }
    },
    getAll: async (req, res) => {
        try {
            const genre = await Genre.findAll({ raw: true });
            res.send(genre);
        } catch (error) {
            res.send({ msg: 'Erro occorrued in search genres function', error: error });
        }
    },
};

module.exports = GenreController;
