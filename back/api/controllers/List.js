const { List, User } = require('../modules/index');

const ListController = {
    post: async (req, res) => {
        const { name, idUser } = req.body;
        try {
            const newList = await List.create({ name, idUser });
            res.status(201).send({ message: 'list created succesfully', listName: newList.dataValues.name });
        } catch (err) {
            console.log(err);
            res.send({ msg: 'error to create list', error: err });
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
                    model: User,
                    required: true,
                    attributes: { exclude: ['password'] },
                },
            });
        } catch (err) {}
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
