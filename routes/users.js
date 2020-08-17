let router = require("express").Router();

module.exports = (db) => {
  const getUserMonthlyContribution = (userId) => {
    return db.query(
      `
      SELECT SUM(entries.price)
      FROM users
      INNER JOIN users_entries ON users.id = users_entries.user_id
      INNER JOIN entries ON entries.id = users_entries.entry_id
      WHERE users.id = $1
      `,
      [userId]
    );
  };

  const getUsersInHome = (homeId) => {
    return db.query(
      `
      SELECT *
      FROM users
      WHERE home_id = $1
      `,
      [homeId]
    );
  };

  router.get("/:id/contribution", (req, res, next) => {
    const userId = req.params.id;
    getUserMonthlyContribution(userId)
      .then((response) => {
        res.send(response.rows[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  router.get("/:homeId", (req, res, next) => {
    const homeId = req.params.homeId;
    getUsersInHome(homeId)
      .then((response) => {
        res.send(response.rows);
      })
      .catch((error) => {
        res.send(error);
      });
  });

  return router;
};
