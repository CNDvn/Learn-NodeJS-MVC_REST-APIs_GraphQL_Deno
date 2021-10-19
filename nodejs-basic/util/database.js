const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "node-complete",
});

module.exports = pool.promise();
