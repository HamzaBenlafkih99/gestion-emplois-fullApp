const mysql = require("mysql");
/*
var connection = mysql.createConnection({
  host: "eu-cdbr-west-01.cleardb.com",
  user: "b7008f34c9985f",
  password: "eb53e982",
  database: "heroku_a11c09d3a3397df",
  multipleStatements: true,
});
*/
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "hamza1999",
  database: "timetable",
  multipleStatements: true,
});

//mysql://b7008f34c9985f:eb53e982@eu-cdbr-west-01.cleardb.com/heroku_a11c09d3a3397df?reconnect=true

const checkConnection = () => {
  connection.connect((err) => {
    if (!err) {
      console.log("connected successfuly");
    } else {
      console.log("connection Failed");
    }
  });
};

module.exports = { checkConnection, connection };
