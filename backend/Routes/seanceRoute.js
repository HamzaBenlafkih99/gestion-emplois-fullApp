const express = require("express");
const Router = express.Router();
const { ajouterSeance, deleteSeance } = require("../controllers/seanceController");
const { getYearId, getEmploiId } = require("../middlewares/seanceMiddleware");

Router.route("/").post(getYearId, getEmploiId, ajouterSeance);
Router.route("/delete").post(deleteSeance);

module.exports = Router;
