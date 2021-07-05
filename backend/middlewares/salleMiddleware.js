const { connection } = require("../connection");

const getAllSalles = (req, res, next) => {
  const query = "select numero from salle";

  connection.query(query, (err, rows, field) => {
    if (!err) {
      const salles = rows.map((salle) => {
        return salle.numero;
      });
      req.salles = salles;
      next();
    } else {
      res.json(["There is an error here"]);
    }
  });
};

module.exports = { getAllSalles };
