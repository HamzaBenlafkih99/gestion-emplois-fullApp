const { connection } = require("../connection");

const findpassword = (req, res, next) => {
  const { email } = req.body;
  const query = `select * from prof where email='${email}'`;
  connection.query(query, (err, rows, field) => {
    if (!err) {
      req.dbpassword = rows[0].password;
      next();
    } else {
      res.json({ message: "Ce utilisateur n'est pas encore connecté" });
    }
  });
};

module.exports = { findpassword };
