const express = require("express");
const Router = express.Router();
const { getProf, selectProfs, profStatistics, selectProf, loginProf, incrept } = require("../controllers/profController");
const { selectProfMiddelware } = require("../middlewares/profMiddleware");
const { findpassword } = require("../middlewares/passwordMiddleware");

Router.route("/login").post(findpassword, loginProf);
Router.route("/hash").post(incrept);
Router.route("/").post(selectProfMiddelware, getProf);
Router.route("/statistics").post(profStatistics);
Router.route("/").get(selectProfs);
Router.route("/prof").post(selectProf);

module.exports = Router;
