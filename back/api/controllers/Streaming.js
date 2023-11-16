const { List, User, Movie, Streaming } = require('../modules/index');
const { Op } = require('sequelize');

const StreamingController = {
    get: async (req, res) => {
        const { id } = req.params;
        try {
            const streaming = await Streaming.findByPk(id);
            if (streaming) {
                return res.status(200).send(streaming);
            }
            throw 'streaming not found';
        } catch (error) {
            return res.status(403).send({ msg: 'an error occoured to get information about streaming', error });
        }
    },
    post: async (req, res) => {
        const { id } = req.params;
        const newStreamings = req.body.map((element) => element.id);

        try {
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
            const streamings = await Streaming.findAll({
                where: {
                    id: {
                        [Op.in]: newStreamings,
                    },
                },
            });
            if (!user) {
                throw 'user not found';
            }

            user.setStreamings(streamings);
            res.send({ user, streamings: streamings });
        } catch (error) {
            console.log(error);
            return res.status(403).send({ msg: 'an error occoured to get information about user', error });
        }
    },
};

module.exports = StreamingController;
