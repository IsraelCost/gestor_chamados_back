require('dotenv').config('../../.env');

module.exports = {
    dialect: 'mysql',
    host: process.env.HOST_DB,
    username: process.env.USER_DB,
    password: process.env.PASS_DB,
    database: 'db_gestor_de_chamados',
    define: {
        timestamps: true,
        underscored: true
    }
};