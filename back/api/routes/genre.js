const express = require("express");
const Router = express.Router();
const { GenreController, authenticate } = require("../controllers/index");

Router.get("/", authenticate, GenreController.getAll);
Router.get("/:id", authenticate, GenreController.get);

module.exports = Router;
