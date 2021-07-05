const express = require("express");
const Router = express.Router();
const { getEmploie, getRepeatedSeances } = require("../controllers/emploiController");
const { getProfEmploie } = require("../controllers/emploiProfController");
const { getSalleEmploie } = require("../controllers/emploisSalleController");

Router.route("/").post(getEmploie);
Router.route("/repeated").post(getRepeatedSeances);
Router.route("/prof").post(getProfEmploie);
Router.route("/salle").post(getSalleEmploie);

module.exports = Router;
