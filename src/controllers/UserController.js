const User = require('../models/UserModel');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

module.exports = {
    async get(req, res, next) {
        try {
            const users = await User.findAll();

            return res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    },

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await User.findOne({ where: { id } });

            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },

    async store(req, res, next) {
        try {
            const { dept, email, tel, name, password } = req.body;

            const userAlreadyExists = await User.findOne({ where: { email } });

            if (userAlreadyExists) {
                const error = new Error('User already exists');
                error.status = 400;
                throw error;
            }

            if (!dept || !email || !tel || !name || !password) {
                const error = new Error('Insert all data');
                error.status = 400;
                throw error;
            }

            const user = await User.create({ dept, email, tel, name, password });

            return res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    },

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { dept, email, tel, name, password } = req.body;

            const userExists = await User.findOne({ where: { id } });

            if (!userExists) {
                const error = new Error('User not exists');
                error.status = 400;
                throw error;
            }

            if (!dept || !email || !tel || !name || !password) {
                const error = new Error('Insert all data');
                error.status = 400;
                throw error;
            }

            await User.update({ dept, email, tel, name, password }, { where: { id } })

            return res.status(200);
        } catch (error) {
            next(error);
        }
    },

    async delete(req, res, next) {
        try {
            const { id } = req.params;

            const userExists = await User.findOne({ where: { id } });

            if (!userExists) {
                const error = new Error('User not exists');
                error.status = 400;
                throw error;
            }

            await User.destroy({ where: { id } });

            return res.status(200);
        } catch (error) {
            next(error);
        }
    },

    async authenticate(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                const error = new Error('Enter fields correctly');
                error.status = 400;
                throw error;
            }

            const user = await User.findOne({ where: { email } });

            if (!user) {
                const error = new Error('User not found');
                error.status = 400;
                throw error;
            }

            if (!await bcrypt.compare(password, user.password)) {
                const error = new Error('Invalid password');
                error.status = 400;
                throw error;
            }

            user.password = undefined;

            const token = jwt.sign({ id: user.id }, authConfig.secret, {
                expiresIn: 1000*60*60*8
            });

            res.status(200).send({ user, token });
        } catch (error) {
            next(error);
        }
    }
};  