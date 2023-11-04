const express = require("express");
const Router = express.Router();
const { UserController, MovieController, authenticate } = require("./controllers/index");
const { User } = require("./modules");

Router.post("/user/create", UserController.post);
Router.post("/user/login", UserController.postLogin);
Router.get("/user", UserController.getByEmail);
Router.get("/user/test", authenticate, UserController.test);
Router.get("/user/:id", authenticate, UserController.get);

Router.get("/movie", MovieController.getMostPopular);
Router.get("/movie/genres", MovieController.getByGenres);
Router.get("/movie/:id", authenticate, MovieController.get);

module.exports = Router;
