const express = require("express");
const Router = express.Router();
const { ListController, authenticate } = require("../controllers/index");

Router.get("/:id", authenticate, ListController.getAll);
Router.post("/", authenticate, ListController.post);
Router.post("/:id", authenticate, ListController.postMovie);
Router.delete("/:id", authenticate, ListController.delete);
Router.delete("/:id", authenticate, ListController.deleteMovie);

module.exports = Router;
