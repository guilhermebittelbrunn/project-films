const express = require("express");
const cors = require("cors");
const app = express();
const Router = require("./api/router");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", Router);

app.get("*", (req, res) => {
    res.redirect("/api");
});

app.listen(process.env.PORT || 5000, (err) => {
    if (err) throw err;
    console.log(`Server running on port ${process.env.PORT || 5000}`);
});
