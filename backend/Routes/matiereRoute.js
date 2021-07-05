const express = require("express");
const Router = express.Router();
const { selectMatiere } = require("../controllers/matiereController");

Router.route("/").post(selectMatiere);

module.exports = Router;
