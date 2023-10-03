const express = require("express");
const Router = express.Router();

const { UserController, MovieController } = require("./controllers/index");

Router.get("/user/create", UserController.post);
Router.post("/user/login", UserController.postLogin);

Router.get("/movie/genres", MovieController.getByGenres);
Router.get("/movie/provider", MovieController.getProvider);
Router.get("/movie/providerrr", MovieController.getProviderrr);
Router.get("/movie/:id", MovieController.get);

Router.get("*", (req, res) => {
    res.send("api home");
});

module.exports = Router;
