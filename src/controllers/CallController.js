const Call = require('../models/CallModel');
const User = require('../models/UserModel');

module.exports = {
    async get(req, res, next) {
        try {
            const calls = await Call.findAll();

            return res.status(200).json(calls);
        } catch (error) {
            next(error);
        }
    },

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const call = await Call.findOne({ where: { id } });

            return res.status(200).json(call);
        } catch (error) {
            next(error);
        }
    },

    async getByUser(req, res, next) {
        try {
            const { user_id } = req.params;

            const userExists = await User.findOne({ where: { id: user_id }, include: { model: Call, as: 'calls' } });

            if (!userExists) {
                const error = new Error('User not exists'); 
                error.status = 400;
                throw error;
            }

            const user = userExists;

            return res.status(200).json(user.calls);
        } catch (error) {
            next(error);
        }
    },

    async store(req, res, next) {
        try {
            const { user_id, description, num_equip } = req.body;

            const userExists = await User.findOne({ where: { id: user_id } });

            if (!userExists) {
                const error = new Error('User not exists');
                error.status = 400;
                throw error;
            }

            if (!description || !user_id || !num_equip) {
                const error = new Error('Insert all data');
                error.status = 400;
                throw error;
            }

            const call = await Call.create({ user_id, description, num_equip });

            return res.status(201).json(call);
        } catch (error) {
            next(error);
        }
    },

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { user_id, description, num_equip } = req.body;

            const callExists = await Call.findOne({ where: { id } });

            if (!callExists) {
                const error = new Error('Call not exists');
                error.status = 400;
                throw error;
            }

            if (!user_id || !description || !num_equip) {
                const error = new Error('Insert all data');
                error.status = 400;
                throw error;
            }

            await Call.update({ user_id, description, num_equip }, { where: { id } })

            return res.status(200);
        } catch (error) {
            next(error);
        }
    },

    async delete(req, res, next) {
        try {
            const { id } = req.params;

            const callExists = await Call.findOne({ where: { id } });

            if (!callExists) {
                const error = new Error('User not exists');
                error.status = 400;
                throw error;
            }

            await Call.destroy({ where: { id } });

            return res.status(200);
        } catch (error) {
            next(error);
        }
    },
};  