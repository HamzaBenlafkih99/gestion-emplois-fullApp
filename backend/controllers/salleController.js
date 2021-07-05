const { connection } = require("../connection");

const removeDuplicate = (rows) => {
  let unique = {};
  rows.forEach((e) => {
    if (!unique[e.salle]) {
      unique[e.salle] = true;
    }
  });
  return Object.keys(unique);
};

const getLocals = (req, res) => {
  connection.query("select numero from salle", (err, rows, field) => {
    if (!err) {
      const salles = rows.map((row) => {
        return row.numero;
      });

      res.json(salles);
    } else {
      console.log(["there is an error"]);
    }
  });
};

const getSalles = (req, res) => {
  let query = "";
  const { jour, heure, annee, semestre } = req.body;
  if (jour && heure && annee && semestre) {
    const salles = req.salles;

    if (req.body.debut && req.body.fin) {
      const { debut, fin } = req.body;
      query = `
      select salle from seance as s
      inner join emploie as e on s.emploie_id=e.id
      inner join year as y on e.year_id=y.id
      where y.annee=${annee}
      and y.semestre=${semestre}
      and s.jour="${jour}" 
      and s.heure="${heure}" 
      and (not(s.fin < ${debut} or s.debut > ${fin}) or (s.debut is null and s.fin is null))
    `;
    } else {
      query = `
      select salle from seance as s
      inner join emploie as e on s.emploie_id=e.id
      inner join year as y on e.year_id=y.id
      where y.annee=${annee}
      and y.semestre=${semestre}
      and s.jour="${jour}" 
      and s.heure="${heure}"  
      and ((s.fin is not null and s.debut is not null) or (s.debut is null and s.fin is null))
      `;
    }

    connection.query(query, (err, rows, field) => {
      if (!err) {
        const ocuppe = removeDuplicate(rows);

        ocuppe.forEach((occ) => {
          const index = salles.indexOf(occ);
          salles.splice(index, 1);
        });

        res.status(200).json(salles);
      } else {
        res.json(["Please try to select the require fields"]);
      }
    });
  } else {
    res.json(["Please try to select the require fields"]);
  }
};

module.exports = { getSalles, getLocals };
