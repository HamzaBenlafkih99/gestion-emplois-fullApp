const { connection } = require("../connection");
/*------------------------*/
const ajouterSeance = (req, res) => {
  const { jour, heure, matiere, type, groupe, prof, salle } = req.body;
  if (jour && heure && matiere && type && groupe && prof && salle) {
    let query = "";
    if (req.body.debut && req.body.fin) {
      const { debut, fin } = req.body;
      query = `
       insert into seance (jour, heure, matiere, type_cours, groupe, prof, salle, debut, fin, emploie_id)
       values ("${jour}", "${heure}", "${matiere}", "${type}", "${groupe}", "${prof}", "${salle}", ${debut}, ${fin}, ${req.emploiId})
       `;
    } else {
      query = `
      insert into seance (jour, heure, matiere, type_cours, groupe, prof, salle, emploie_id)
      values ("${jour}", "${heure}", "${matiere}", "${type}", "${groupe}", "${prof}", "${salle}", ${req.emploiId})
       `;
    }

    connection.query(query, (err, result) => {
      if (!err) {
        res.json({ message: "Inserted successfuly!" });
      } else {
        res.status(400).json({ message: "Not inserted try again !" });
      }
    });
  } else {
    res.status(400).json({ message: "The server occurred an error!" });
  }
};

const deleteSeance = (req, res) => {
  if (req.body.id) {
    const query = `delete from seance where id=${req.body.id}`;

    connection.query(query, (err, result) => {
      if (!err) {
        res.json({ message: "deleted successfuly!" });
      } else {
        res.status(400).json({ message: "Not deleted try again !" });
      }
    });
  } else {
    res.status(400).json({ message: "The server occurred an error!" });
  }
};

module.exports = { ajouterSeance, deleteSeance };
