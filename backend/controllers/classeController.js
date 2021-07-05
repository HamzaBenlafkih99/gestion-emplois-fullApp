const { connection } = require("../connection");
/*node api khasha tkhdem khasah lkhedma
 */
const removeDuplicate = (rows) => {
  let unique = {};
  rows.forEach((e) => {
    if (!unique[e.annee]) {
      unique[e.annee] = true;
    }
  });
  return Object.keys(unique);
};

const getAnnee = (req, res) => {
  connection.query("select annee from year", (err, rows, field) => {
    const annees = removeDuplicate(rows);
    if (!err) {
      res.json(annees);
    } else {
      console.log(err.message);
    }
  });
};

const getFiliere = (req, res) => {
  connection.query("select nom from filiere", (err, rows, field) => {
    if (!err) {
      const filieres = rows.map((row) => {
        return row.nom;
      });

      res.json(filieres);
    } else {
      console.log(["there is an error"]);
    }
  });
};

const getclasse = (req, res) => {
  const { nom } = req.body;
  if (nom) {
    const query = `
    select cl.nom from classe as cl
    inner join filiere as f on cl.filiere_id=f.id
    where f.nom="${nom}";
  `;

    connection.query(query, (err, rows, field) => {
      let classes = [];
      if (!err) {
        classes = rows.map((row) => {
          return row.nom;
        });
        res.json(classes);
      } else {
        res.json(["there is an error"]);
      }
    });
  } else {
    res.json(["there is an error"]);
  }
};

module.exports = { getclasse, getFiliere, getAnnee };
