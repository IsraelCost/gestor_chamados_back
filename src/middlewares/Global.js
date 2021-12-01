module.exports = {
    notFound(req, res, next) {
        const error = new Error('Not Found :(');
        error.status = 404;
        next(error);
    },

    catchAll(error, req, res, next) {
        return res.status(error.status || 500).json({ error: error.message });
    }
};