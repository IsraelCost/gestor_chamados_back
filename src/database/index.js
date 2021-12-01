const Sequelize = require('sequelize');

const dbConfig = require('../config/database');

const connection = new Sequelize(dbConfig);

const User = require('../models/UserModel');
const Call = require('../models/CallModel');

User.init(connection);
Call.init(connection);

Call.associate(connection.models);
User.associate(connection.models);

module.exports = connection;