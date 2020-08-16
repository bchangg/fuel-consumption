const pg = require("pg");

const client = new pg.Client({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

client
  .connect()
  .catch((e) => console.log(`Error connecting to Postgres server:\n${e}`));

console.log("reached here");

module.exports = client;
