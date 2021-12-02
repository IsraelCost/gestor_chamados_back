const express = require('express');

const routes = express.Router();

const userController = require('./controllers/UserController');
const callController = require('./controllers/CallController');

// ROTAS PARA OS USUÁRIOS //
routes.get('/users', userController.get);
routes.get('/users/:id', userController.getById);
routes.post('/users', userController.store);
routes.post('/users/authenticate', userController.authenticate);
routes.put('/users/:id', userController.update);
routes.delete('/users/:id', userController.delete);

// ROTAS PARA OS CHAMADOS //
routes.get('/calls', callController.get);
routes.get('/calls/:id', callController.getById);
routes.post('/calls', callController.store);
routes.put('/calls/:id', callController.update);
routes.delete('/calls/:id', callController.delete);

routes.get('/calls/sent/user/:user_id', callController.getSent);
routes.get('/calls/received/user/:user_id', callController.getReceived);

module.exports = routes;