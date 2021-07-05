const { connection } = require("../connection");

const getTypedGroupes = (req, res, next) => {
  const { type, classe } = req.body;
  if (type && classe) {
    const query = `
    select g.nom from groupe as g
    inner join classe as c on g.classe_id=c.id
    inner join type_cours as t on g.id_type=t.id_type
    where t.nom="${type}" and c.nom="${classe}"
    `;

    connection.query(query, (err, rows, field) => {
      if (!err) {
        const groupes = rows.map((grp) => {
          return grp.nom;
        });
        req.availbleGroupes = groupes;
        next();
      } else {
        res.json(["There is an error here"]);
      }
    });
  } else {
    res.json(["There is an error here"]);
  }
};

const groupeOccupe = (req, res, next) => {
  const { classe, jour, heure, annee, semestre } = req.body;
  if (classe && jour && heure && annee && semestre) {
    let query = "";
    if (req.body.debut && req.body.fin) {
      const { debut, fin } = req.body;
      query = `
      select groupe, type_cours as type from seance as s
      inner join emploie as e on s.emploie_id=e.id
      inner join year as y on e.year_id=y.id
      where y.annee=${annee}
      and y.semestre=${semestre}
      and e.classe="${classe}"
      and s.jour="${jour}" 
      and s.heure="${heure}"  
      and (not(s.fin < ${debut} or s.debut > ${fin}) or (s.debut is null and s.fin is null))
      `;
    } else {
      query = `
      select groupe, type_cours as type from seance as s
      inner join emploie as e on s.emploie_id=e.id
      inner join year as y on e.year_id=y.id
      where y.annee=${annee}
      and y.semestre=${semestre}
      and e.classe="${classe}"
      and s.jour="${jour}" 
      and s.heure="${heure}" 
      and ((s.fin is not null and s.debut is not null) or (s.debut is null and s.fin is null))
      `;
    }

    connection.query(query, (err, rows, field) => {
      if (!err) {
        req.groupeOccupe = rows;
        next();
      } else {
        res.json(["There is an error here"]);
      }
    });
  } else {
    res.json(["There is an error here"]);
  }
};

module.exports = { getTypedGroupes, groupeOccupe };
