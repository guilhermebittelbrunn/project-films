const { List, User, Movie } = require('../modules/index');

const ListController = {
    post: async (req, res) => {
        const { name, idUser } = req.body;
        try {
            const list = await List.findOne({ where: { name, idUser } });
            console.log(list);
            if (list) throw 'list already exists';

            const newList = await List.create({ name, idUser });
            const allLists = await List.findAll({
                raw: true,
                where: {
                    idUser: idUser,
                },
            });
            res.status(201).send(allLists);
        } catch (err) {
            res.status(400).send({ msg: 'error to create list', error: err });
        }
    },
    postMovie: async (req, res) => {
        const { id } = req.params;
        const { name, idMovie } = req.body;
        try {
            const list = await List.findOne({
                where: { name: name, idUser: id },
                include: {
                    model: Movie,
                    required: false,
                    attributes: { exclude: ['json'] },
                },
            });
            if (list) {
                const movie = await Movie.findByPk(idMovie);
                list.addMovies(movie);
                const lists = await List.findAll({
                    where: {
                        idUser: id,
                    },
                    include: {
                        model: Movie,
                        required: false,
                        attributes: { exclude: ['json'] },
                    },
                });
                return res.status(200).send(lists);
            }
            throw 'List not found';
        } catch (error) {
            console.log(error);
            res.status(400).send({ msg: 'Error to add movie to list' });
        }
    },
    get: async (req, res) => {
        const { id } = req.params;
        try {
            const list = await List.findByPk(id);
            if (list) {
                return res.status(200).send(list);
            }
            throw 'list not found';
        } catch (error) {
            return res.status(403).send({ msg: 'an error occoured to get information about list', error });
        }
    },
    getAll: async (req, res) => {
        const { id } = req.params;
        try {
            const lists = await List.findAll({
                where: {
                    idUser: id,
                },
                include: {
                    model: Movie,
                    required: false,
                    attributes: { exclude: ['json'] },
                },
            });

            if (lists) {
                return res.status(200).send(lists);
            }
            throw 'list not found';
        } catch (error) {
            return res.status(403).send({ msg: 'an error occoured to get information about list', error });
        }
    },
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const list = await List.findByPk(id);
            if (list) {
                await list.destroy();
                return res.status(200).send('list deleted succesfully');
            }
            throw 'list not found';
        } catch (error) {
            return res.status(403).send({ msg: 'an error occoured to delete list', error });
        }
    },
    deleteMovie: async (req, res) => {
        const { id } = req.params;
        const { name } = req.query;
        const idUser = req.idUser;
        try {
            const list = await List.findOne({ where: { name, idUser } });
            const removedList = await list.removeMovies(id);
            res.status(200).send(`${name} removed successfully`);
        } catch (error) {
            res.status(400).send({ msg: 'an error occoured to delete movie in list', error });
        }
    },
    put: async (req, res) => {
        const { id } = req.params;
        const { name } = req.body;
        try {
            const list = await List.findByPk(id);
            if (list) {
                await list.update({ name });
                return res.status(200).send('list updated succesfully');
            }
            throw 'list not found';
        } catch (error) {
            return res.status(403).send({ msg: 'an error occoured to update list', error });
        }
    },
};

module.exports = ListController;
