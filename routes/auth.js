let router = require("express").Router();
const bcrypt = require("bcrypt");

module.exports = (db) => {
  const findUserFromEmail = (email) => {
    return db.query(
      `
      SELECT *
      FROM users
      WHERE email = $1
    `,
      [email]
    );
  };

  const findUserFromId = (id, homeId) => {
    return db.query(
      `
      SELECT *
      FROM users
      WHERE id = $1 AND home_id = $2
    `,
      [id, homeId]
    );
  };

  const createUserAndReturnAll = (
    first_name,
    last_name,
    email,
    encrypted_password,
    home_id
  ) => {
    return db.query(
      `
      INSERT INTO users(first_name, last_name, email, encrypted_password, home_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
      [first_name, last_name, email, encrypted_password, home_id]
    );
  };
  const createHomeAndReturnId = (address) => {
    return db.query(
      `
      INSERT INTO homes (address)
      VALUES ($1)
      RETURNING id AS home_id;
      `,
      [address]
    );
  };

  const destroyHome = (home_id) => {
    return db.query(
      `
      DELETE FROM homes
      WHERE id = $1
      `,
      [home_id]
    );
  };

  router.post("/register", (req, res, next) => {
    let {
      address,
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation,
    } = req.body;
    if (password === passwordConfirmation) {
      createHomeAndReturnId(address)
        .then((response) => {
          let homeId = response.rows[0].home_id;
          bcrypt
            .genSalt(10)
            .then((salt) => {
              return bcrypt.hash(password, salt);
            })
            .then((hash) => {
              createUserAndReturnAll(firstName, lastName, email, hash, homeId)
                .then((response) => {
                  const user = response.rows[0];
                  req.session.userId = user.id;
                  req.session.homeId = user.home_id;
                  res.send(user);
                })
                .catch((error) => {
                  destroyHome(homeId).then((response) => {
                    res.send(error);
                  });
                });
            });
        })
        .catch((error) => {
          res.send(error);
        });
    } else {
      res.send("passwords don't match");
    }
  });

  router.post("/login", (req, res, next) => {
    const { email, password } = req.body;

    findUserFromEmail(email)
      .then((response) => {
        const { id, encrypted_password, home_id } = response.rows[0];
        bcrypt.compare(password, encrypted_password).then((result) => {
          if (result) {
            req.session.homeId = home_id;
            req.session.userId = id;
            res.send("success");
          } else {
            res.send("passwords don't match");
          }
        });
      })
      .catch((error) => {
        res.send(error);
      });
  });

  router.get("/loggedIn", (req, res, next) => {
    const userId = req.session.userId;
    const homeId = req.session.homeId;
    if (userId && homeId) {
      findUserFromId(userId, homeId)
        .then((response) => {
          const user = response.rows[0];
          res.send(user);
        })
        .catch((error) => {
          res.send(error);
        });
    } else {
      res.send("no cookie");
    }
  });

  router.post("/logout", (req, res, next) => {
    req.session = null;
    res.send("success");
  });

  return router;
};
