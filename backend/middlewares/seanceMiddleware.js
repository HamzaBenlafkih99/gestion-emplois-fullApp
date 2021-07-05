const { connection } = require("../connection");

const getYearId = (req, res, next) => {
  const { annee, semestre } = req.body;
  if (annee && semestre) {
    const query = `select id from year where annee=${annee} and semestre=${semestre}`;

    connection.query(query, (err, rows, field) => {
      if (!err) {
        const ids = rows.map((donne) => {
          return donne.id;
        });
        req.yearId = ids[0];
        next();
      } else {
        res.status(400).json({ message: "The server occurred an error!" });
      }
    });
  } else {
    res.status(400).json({ message: "The server occurred an error!" });
  }
};

const getEmploiId = (req, res, next) => {
  const { classe } = req.body;
  const query = `select id from emploie where classe="${classe}" and year_id=${req.yearId}`;

  connection.query(query, (err, rows, field) => {
    if (!err) {
      const emploiIds = rows.map((emploiId) => {
        return emploiId.id;
      });
      req.emploiId = emploiIds[0];
      next();
    } else {
      res.json(["There is an error here"]);
    }
  });
};

module.exports = { getYearId, getEmploiId };
