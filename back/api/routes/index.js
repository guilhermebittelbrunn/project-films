const express = require("express");
const Router = express.Router();

const RouterUser = require("./user");
const RouterMovie = require("./movie");
const RouterGenre = require("./genre");
const RouterList = require("./list");
const RouterStreaming = require("./streaming");

Router.use("/user", RouterUser);
Router.use("/movie", RouterMovie);
Router.use("/genres", RouterGenre);
Router.use("/lists", RouterList);
Router.use("/streaming", RouterStreaming);

module.exports = Router;
