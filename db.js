const Pool = require("pg").Pool;

const pool = new Pool({
  user: "Herman",
  password: "",
  host: "localhost",
  port: "5432",
  database: "perntodo",
});

module.exports = pool;
