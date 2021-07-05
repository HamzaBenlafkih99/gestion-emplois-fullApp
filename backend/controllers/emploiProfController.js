const { connection } = require("../connection");
const { emploie } = require("../data/emploi");

const remplireSeance = (seance, day, emploiJour) => {
  if (seance.jour == day) {
    if (seance.heure == "8h:00-9h:55") {
      emploiJour.huit.push({
        matiere: seance.matiere,
        type_cours: seance.type_cours,
        groupe: seance.groupe,
        classe: seance.classe,
        salle: seance.salle,
      });
    } else if (seance.heure == "10h:10-12h:00") {
      emploiJour.dix.push({
        matiere: seance.matiere,
        type_cours: seance.type_cours,
        groupe: seance.groupe,
        classe: seance.classe,
        salle: seance.salle,
      });
    } else if (seance.heure == "12h:10 -14h:00") {
      emploiJour.dizen.push({
        matiere: seance.matiere,
        type_cours: seance.type_cours,
        groupe: seance.groupe,
        classe: seance.classe,
        salle: seance.salle,
      });
    } else if (seance.heure == "14h:00-15h:55") {
      emploiJour.quat.push({
        matiere: seance.matiere,
        type_cours: seance.type_cours,
        groupe: seance.groupe,
        classe: seance.classe,
        salle: seance.salle,
      });
    } else if (seance.heure == "16h:10-18h:00") {
      emploiJour.six.push({
        matiere: seance.matiere,
        type_cours: seance.type_cours,
        groupe: seance.groupe,
        classe: seance.classe,
        salle: seance.salle,
      });
    }
  }
};

const initTable = (emploiJour) => {
  emploiJour.huit = [];
  emploiJour.dix = [];
  emploiJour.dizen = [];
  emploiJour.quat = [];
  emploiJour.six = [];
};

const initialization = () => {
  initTable(emploie.lundi);
  initTable(emploie.mardi);
  initTable(emploie.mercredi);
  initTable(emploie.jeudi);
  initTable(emploie.vendredi);
  initTable(emploie.samedi);
};

const getProfEmploie = (req, res) => {
  const { annee, semestre, prof } = req.body;
  if (annee && semestre && prof) {
    initialization();
    const request = `
    select * from seance as s 
    inner join emploie as e on s.emploie_id=e.id
    inner join year as y on y.id=e.year_id
    where prof='${prof}' and y.annee=${annee} and y.semestre=${semestre}
    `;
    connection.query(request, (err, rows, field) => {
      if (!err) {
        rows.forEach((seance) => {
          remplireSeance(seance, "lundi", emploie.lundi);
          remplireSeance(seance, "mardi", emploie.mardi);
          remplireSeance(seance, "mercredi", emploie.mercredi);
          remplireSeance(seance, "jeudi", emploie.jeudi);
          remplireSeance(seance, "vendredi", emploie.vendredi);
          remplireSeance(seance, "samedi", emploie.samedi);
        });
        res.json(emploie);
      } else {
        res.json({ message: "there is an error" });
      }
    });
  } else {
    res.json({ message: "there is an error" });
  }
};

module.exports = { getProfEmploie };
