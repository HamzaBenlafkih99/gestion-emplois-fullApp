const { connection } = require("../connection");
const { emploie } = require("../data/emploi");

const remplireSeance = (seance, day, emploiJour) => {
  if (seance.jour == day) {
    if (seance.heure == "8h:00-9h:55") {
      emploiJour.huit.push({
        id: seance.id,
        jour: seance.jour,
        heure: seance.heure,
        matiere: seance.matiere,
        type_cours: seance.type_cours,
        groupe: seance.groupe,
        prof: seance.prof,
        salle: seance.salle,
        debut: seance.debut,
        fin: seance.fin,
      });
    } else if (seance.heure == "10h:10-12h:00") {
      emploiJour.dix.push({
        id: seance.id,
        jour: seance.jour,
        heure: seance.heure,
        matiere: seance.matiere,
        type_cours: seance.type_cours,
        groupe: seance.groupe,
        prof: seance.prof,
        salle: seance.salle,
        debut: seance.debut,
        fin: seance.fin,
      });
    } else if (seance.heure == "12h:10 -14h:00") {
      emploiJour.dizen.push({
        id: seance.id,
        jour: seance.jour,
        heure: seance.heure,
        matiere: seance.matiere,
        type_cours: seance.type_cours,
        groupe: seance.groupe,
        prof: seance.prof,
        salle: seance.salle,
        debut: seance.debut,
        fin: seance.fin,
      });
    } else if (seance.heure == "14h:00-15h:55") {
      emploiJour.quat.push({
        id: seance.id,
        jour: seance.jour,
        heure: seance.heure,
        matiere: seance.matiere,
        type_cours: seance.type_cours,
        groupe: seance.groupe,
        prof: seance.prof,
        salle: seance.salle,
        debut: seance.debut,
        fin: seance.fin,
      });
    } else if (seance.heure == "16h:10-18h:00") {
      emploiJour.six.push({
        id: seance.id,
        jour: seance.jour,
        heure: seance.heure,
        matiere: seance.matiere,
        type_cours: seance.type_cours,
        groupe: seance.groupe,
        prof: seance.prof,
        salle: seance.salle,
        debut: seance.debut,
        fin: seance.fin,
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

const getEmploie = (req, res) => {
  initialization();
  const { annee, semestre, classe } = req.body;
  if (annee && semestre && classe) {
    const request = `
    select s.id, s.jour, s.heure, s.matiere, s.type_cours, s.prof, s.salle, s.groupe, s.debut, s.fin from seance as s 
    inner join emploie as e on s.emploie_id=e.id
    inner join year as y on y.id=e.year_id
    where e.classe='${classe}' and y.annee=${annee} and y.semestre=${semestre}
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

const getRepeatedSeances = (req, res) => {
  const { annee, semestre, classe, jour, heure } = req.body;
  const request = `
    select count(*) as nbr from seance as s 
    inner join emploie as e on s.emploie_id=e.id
    inner join year as y on y.id=e.year_id
    where e.classe='${classe}' and y.annee=${annee} and y.semestre=${semestre} and s.jour='${jour}' and s.heure='${heure}'
    `;
  connection.query(request, (err, rows, field) => {
    if (!err) {
      const repeated = rows.map((r) => {
        return r.nbr;
      });
      res.json({ nbr: repeated[0] });
    } else {
      res.json({ message: "There is an error" });
    }
  });
};

module.exports = { getEmploie, getRepeatedSeances };
