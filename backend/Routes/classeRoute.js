const express = require("express");
const Router = express.Router();
const { getclasse, getFiliere, getAnnee } = require("../controllers/classeController");

Router.route("/").get(getFiliere);
Router.route("/annee").get(getAnnee);
Router.route("/classes").post(getclasse);

module.exports = Router;
