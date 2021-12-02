const express = require('express');

const routes = express.Router();

const multer = require('multer');
const multerConfig = require('./config/multer');

const userController = require('./controllers/UserController');
const callController = require('./controllers/CallController');
const imageController = require('./controllers/ImageController');

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

// ROTAS PARA AS IMAGENS DOS USUÁRIOS //
routes.get('/images', imageController.get);
routes.post('/images', multer(multerConfig).single("file"), imageController.store);
routes.put('/images/:id', multer(multerConfig).single("file"), imageController.update);
routes.delete('/images/:id', imageController.delete);

module.exports = routes;