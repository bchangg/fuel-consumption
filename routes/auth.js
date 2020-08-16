let router = require("express").Router();

const findUser = (email) => {
  return `
    SELECT *
    FROM users
    WHERE email = ${email}
  `;
};

// const createUser = (email, password) => {
//   return `
//     INSERT INTO users
//   `;
// };

module.exports = (db) => {
  router.post("/register", (req, res, next) => {
    res.json({ hello: "world" });
  });

  router.post("/login", (req, res, next) => {
    let { userEmail, userPassword } = req.body;
    let user = db.query(findUserId(userEmail));
    if (user) {
      req.session.userId = userId;
    } else {
    }
    res.redirect("/");
  });

  router.get("/loggedIn", (req, res, next) => {
    const userId = req.session.userId;
    if (userId) {
      res.send(userId);
    }
  });

  return router;
};
