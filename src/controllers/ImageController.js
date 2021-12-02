const Image = require('../models/ImageModel');

module.exports = {
    async get(req, res, next) {
        try {
            const images = await Image.findAll();

            return res.status(200).json(images);
        } catch (error) {
            next(error);
        }
    },

    async store(req, res, next) {
        try {
            const { user_id } = req.body;

            const image = await Image.create({ user_id });
          
            return res.status(201).json(image);
        } catch (error) {
            next(error);
        }
    },

    async update(req, res, next) {
        try {
            const { id } = req.params;

            const imageExists = await Image.findOne({ where: { id } });

            if (!imageExists) {
                const error = new Error('Image not exists');
                error.status = 400;
                throw error;
            }

            const { originalname: name, size, key, location: url = "" } = req.file;

            await Image.update({
                name,
                size,
                key: imageExists.key || key,
                url,
            }, { where: { id } });

            return res.status(200).send();
        } catch (error) {
            next(error);
        }
    },

    async delete(req, res, next) {
        try {
            const { id } = req.params;

            const imageExists = await Image.findOne({ where: { id } });

            if (!imageExists) {
                const error = new Error('Image not exists');
                error.status = 400;
                throw error;
            }

            await Image.destroy({ where: { id } });

            return res.status(200).send();
        } catch (error) {
            next(error);
        }
    }
};