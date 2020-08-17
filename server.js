require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const helmet = require("helmet");
const db = require("./db");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "spotMeBackCookie",
    keys: ["randomGibberish"],
  })
);

const homesRouter = require("./routes/homes.js");
const usersRouter = require("./routes/users.js");
const entriesRouter = require("./routes/entries.js");
const authRouter = require("./routes/auth.js");
app.use("/api/homes", homesRouter(db));
app.use("/api/users", usersRouter(db));
app.use("/api/entries", entriesRouter(db));
app.use("/auth", authRouter(db));

function read(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      file,
      {
        encoding: "utf-8",
      },
      (error, data) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
  });
}

Promise.all([
  read(path.resolve(__dirname, `./db/schema/create.sql`)),
  read(path.resolve(__dirname, `./db/schema/seed.sql`)),
])
  .then(([create, seed]) => {
    db.query(create)
      .then(db.query(seed))
      .then(() => {
        console.log("Successfully created database");
      })
      .catch((error) => {
        console.log(`Error setting up database: ${error}`);
      });
  })
  .catch((error) => {
    console.log(`Error setting up database: ${error}`);
  });

app.close = function () {
  return db.end();
};

app.listen(port, () => console.log(`Listening on port ${port}`));
