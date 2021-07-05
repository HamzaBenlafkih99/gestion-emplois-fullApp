const { connection } = require("../connection");

const selectProfMiddelware = (req, res, next) => {
  const { matiere } = req.body;
  if (matiere) {
    const query = `select nom from prof where matiere="${matiere}"`;
    connection.query(query, (err, rows, field) => {
      if (!err) {
        req.profs = rows.map((row) => {
          return row.nom;
        });
        next();
      } else {
        res.json(["There is an error here"]);
      }
    });
  } else {
    res.json(["There is an error here"]); //try again
  }
};

module.exports = { selectProfMiddelware };
