const express = require('express');
const Router = express.Router();
const {
    UserController,
    MovieController,
    GenreController,
    ListController,
    StreamingController,
    authenticate,
} = require('./controllers/index');

Router.post('/user/create', UserController.post);
Router.post('/user/login', UserController.postLogin);
Router.get('/user', UserController.getByEmail);
Router.get('/user/:id', authenticate, UserController.get);
Router.put('/user/:id', authenticate, UserController.put);

Router.get('/movie', MovieController.getAll);
Router.get('/movie/:id', authenticate, MovieController.get);

Router.get('/genres', authenticate, GenreController.getAll);
Router.get('/genre/:id', authenticate, GenreController.get);

Router.get('/lists/:id', authenticate, ListController.getAll);
Router.post('/lists', authenticate, ListController.post);
Router.post('/lists/:id', authenticate, ListController.postMovie);
Router.delete('/list/:id', authenticate, ListController.delete);
Router.delete('/lists/:id', authenticate, ListController.deleteMovie);

Router.get('/streaming/:id', authenticate, StreamingController.get);
Router.post('/streaming/:id', authenticate, StreamingController.post);

module.exports = Router;
