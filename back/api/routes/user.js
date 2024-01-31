const express = require("express");
const Router = express.Router();
const { UserController, authenticate } = require("../controllers/index");

Router.post("/create", UserController.post);
Router.post("/login", UserController.postLogin);
Router.get("/", UserController.getByEmail);
Router.get("/:id", authenticate, UserController.get);
Router.put("/:id", authenticate, UserController.put);

module.exports = Router;
