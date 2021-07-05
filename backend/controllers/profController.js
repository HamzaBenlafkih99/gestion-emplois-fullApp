const { connection } = require("../connection");
const bcrypt = require("bcryptjs");

const removeDuplicate = (rows) => {
  let unique = {};
  rows.forEach((e) => {
    if (!unique[e.prof]) {
      unique[e.prof] = true;
    }
  });
  return Object.keys(unique);
};

const removeProfDuplicate = (rows) => {
  let unique = {};
  rows.forEach((e) => {
    if (!unique[e.nom]) {
      unique[e.nom] = true;
    }
  });
  return Object.keys(unique);
};

const getProf = (req, res) => {
  let query = "";

  const { matiere, jour, heure, annee, semestre } = req.body;
  if (matiere && jour && heure && annee && semestre) {
    const professeurs = req.profs;
    if (req.body.debut && req.body.fin) {
      const { debut, fin } = req.body;
      query = `
      select prof from seance as s
      inner join emploie as e on s.emploie_id=e.id
      inner join year as y on e.year_id=y.id
      where y.annee=${annee}
      and y.semestre=${semestre}
      and s.jour="${jour}"
      and s.matiere="${matiere}"
      and s.heure="${heure}"  
      and (not(s.fin < ${debut} or s.debut > ${fin}) or (s.debut is null and s.fin is null))
    `;
    } else {
      query = `
      select prof from seance as s
      inner join emploie as e on s.emploie_id=e.id
      inner join year as y on e.year_id=y.id
      where y.annee=${annee}
      and y.semestre=${semestre}
      and s.jour="${jour}" 
      and s.matiere="${matiere}"
      and s.heure="${heure}"
      and ((s.fin is not null and s.debut is not null) or (s.debut is null and s.fin is null))
    `;
    }

    connection.query(query, (err, rows, field) => {
      if (!err) {
        const profOccupe = removeDuplicate(rows);

        profOccupe.forEach((prf) => {
          const index = professeurs.indexOf(prf);
          if (index > -1) {
            professeurs.splice(index, 1);
          }
        });

        return res.json(professeurs);
      } else {
        res.json(["Please try to select the require fields"]);
      }
    });
  } else {
    res.json(["Please try to select the require fields"]);
  }
};

const loginProf = async (req, res) => {
  const { email, password } = req.body;

  const validPassword = await bcrypt.compare(password, req.dbpassword);
  if (validPassword) {
    const query = `select nom from prof where email='${email}' and password='${req.dbpassword}'`;
    connection.query(query, (err, rows, field) => {
      if (!err) {
        res.json({ nom: rows[0].nom });
      } else {
        res.json({ message: "Ce utilisateur n'est pas encore connecté" });
      }
    });
  } else {
    res.json({ message: "Ce utilisateur n'est pas encore connecté" });
  }
};

const selectProfs = (req, res) => {
  connection.query("select nom from prof", (err, rows, field) => {
    if (!err) {
      const profs = removeProfDuplicate(rows);
      res.json(profs);
    } else {
      res.json(["There is an error here"]);
    }
  });
};

const selectProf = (req, res) => {
  if (req.body.departement) {
    const query = `select distinct nom, departement from prof where departement='${req.body.departement}'`;
    connection.query(query, (err, rows, field) => {
      if (!err) {
        res.json(rows);
      } else {
        res.json(["There is an error here"]);
      }
    });
  } else {
    res.json(["There is an error here"]);
  }
};
/*------------------------*/
const profStatistics = (req, res) => {
  let total = 0;
  const { prof, semestre, annee } = req.body;
  if (prof && semestre && annee) {
    const query = `select s.prof, s.debut, s.fin from seance as s
    inner join emploie as e on s.emploie_id=e.id
    inner join year as y on e.year_id=y.id
    where y.annee=${annee} and y.semestre=${semestre} and s.prof="${prof}"`;

    connection.query(query, (err, rows, field) => {
      if (!err) {
        rows.forEach((data) => {
          if (data.debut != null && data.fin != null) {
            total += (data.fin - data.debut) * 2;
          } else {
            total += 40;
          }
        });
        res.json(total);
      } else {
        res.json(0);
      }
    });
  } else {
    res.json(0);
  }
};

const incrept = async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);
    res.json({ psd: hashed });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getProf, selectProf, selectProfs, profStatistics, loginProf, incrept };
