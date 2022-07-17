const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "your_db",
  password: "yourpassword",
  port: 5432,
});

module.exports = pool;
