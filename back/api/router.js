const express = require("express");
const Router = express.Router();

const UserController = require("./controllers/User");

Router.get("/create", UserController.post);
Router.get("*", (req, res) => {
    res.send("api home");
});

module.exports = Router;
