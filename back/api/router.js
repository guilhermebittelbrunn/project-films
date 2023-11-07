const express = require('express');
const Router = express.Router();
const {
    UserController,
    MovieController,
    GenreController,
    ListController,
    authenticate,
} = require('./controllers/index');

Router.post('/user/create', UserController.post);
Router.post('/user/login', UserController.postLogin);
Router.get('/user', UserController.getByEmail);
Router.get('/user/test', authenticate, UserController.test);
Router.get('/user/:id', authenticate, UserController.get);

Router.get('/movie', MovieController.getMovieList);
Router.get('/movie/genres', authenticate, MovieController.getByGenres);
Router.get('/movie/:id', authenticate, MovieController.get);

Router.get('/genres', authenticate, GenreController.getAll);
Router.get('/genre/:id', authenticate, GenreController.get);

Router.get('/lists/:id', authenticate, ListController.getAll);
// Router.post('/lists', authenticate, ListController.post)
Router.post('/lists', authenticate, ListController.post);

module.exports = Router;
