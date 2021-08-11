const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const groupeRoute = require("./Routes/groupeRoute");
const salleRoute = require("./Routes/salleRoute");
const classeRoute = require("./Routes/classeRoute");
const profRoute = require("./Routes/profRoute");
const matiereRoute = require("./Routes/matiereRoute");
const seanceRoute = require("./Routes/seanceRoute");
const emploiRoute = require("./Routes/emploiRoute");
const { checkConnection } = require("./connection");
const app = express();

//error handeling

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("server is working ...");
});

app.use("/filieres", classeRoute);
app.use("/matieres", matiereRoute);
app.use("/availbleSalle", salleRoute);
app.use("/groupes", groupeRoute);
app.use("/availbleProf", profRoute);
app.use("/addSeance", seanceRoute);
app.use("/emploie", emploiRoute);

const PORT = process.env.PORT || 5000;

checkConnection();

app.listen(PORT, () => console.log("server is running on port 5000 ..."));
