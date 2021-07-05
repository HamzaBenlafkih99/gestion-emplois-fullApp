const { connection } = require("../connection");

const selectMatiere = (req, res) => {
  const { semestre, classe } = req.body;
  if (semestre && classe) {
    const query = `
    select m.nom_matiere as matiere from matiere as m
    inner join classe as c on c.id=m.classe_id
    where m.semestre=${semestre} and c.nom="${classe}"
    `;

    connection.query(query, (err, rows, field) => {
      if (!err) {
        const matieres = rows.map((row) => {
          return row.matiere;
        });

        res.json(matieres);
      } else {
        res.json(["Please try to select the require fields"]);
      }
    });
  } else {
    res.json(["Please try to select the require fields"]);
  }
};

module.exports = { selectMatiere };
