const express = require("express");
const Router = express.Router();
const { getTypedGroupes, groupeOccupe } = require("../middlewares/groupeMiddelware");
const { cpGroupeAvailble, ciGroupeAvailble } = require("../controllers/groupeController");

Router.route("/availblecp").post(getTypedGroupes, groupeOccupe, cpGroupeAvailble);
Router.route("/availbleci").post(getTypedGroupes, groupeOccupe, ciGroupeAvailble);
//Router.route("/").post(getTypedGroupes);

module.exports = Router;
