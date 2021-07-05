const express = require("express");
const Router = express.Router();
const { getAllSalles } = require("../middlewares/salleMiddleware");
const { getSalles, getLocals } = require("../controllers/salleController");

Router.route("/").get(getLocals);
Router.route("/").post(getAllSalles, getSalles);

module.exports = Router;
