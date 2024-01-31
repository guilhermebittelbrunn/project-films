const express = require("express");
const Router = express.Router();
const { MovieController, authenticate } = require("../controllers/index");

Router.get("/", MovieController.getAll);
Router.get("/:id", authenticate, MovieController.get);

module.exports = Router;
