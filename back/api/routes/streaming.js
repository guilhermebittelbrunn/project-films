const express = require("express");
const Router = express.Router();
const { StreamingController, authenticate } = require("../controllers/index");

Router.get("/:id", authenticate, StreamingController.get);
Router.post("/:id", authenticate, StreamingController.post);

module.exports = Router;
