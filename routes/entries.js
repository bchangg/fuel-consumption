let router = require("express").Router();

module.exports = (db) => {
  const fetchEntriesByCategoryInHome = (home_id, category) => {
    return db.query(
      `
        SELECT
          entries.id AS id,
          entries.home_id AS home_id,
          users_entries.user_id AS user_id,
          entries.name AS name,
          entries.price AS price,
          entries.category,
          entries.created_at
        FROM
          entries
        INNER JOIN
          users_entries ON entries.id = users_entries.entry_id
        WHERE
          entries.home_id = $1 AND entries.category = $2
      `,
      [home_id, category]
    );
  };

  const createEntry = (name, category, price, homeId) => {
    return db.query(
      `
        INSERT INTO entries (name, category, price, home_id)
        VALUES ($1, $2, $3, $4)
        RETURNING id AS entryId, home_id AS homeId
      `,
      [name, category, price, homeId]
    );
  };

  const createUsersEntry = (userId, entryId, homeId) => {
    return db.query(
      `
        INSERT INTO users_entries (user_id, entry_id, home_id)
        VALUES ($1, $2, $3)
        RETURNING user_id AS userId, entry_id AS entryId
      `,
      [userId, entryId, homeId]
    );
  };

  const getUserFromId = (userId, homeId) => {
    return db.query(
      `
      SELECT *
      FROM users
      WHERE id = $1 AND home_id = $2
      `,
      [userId, homeId]
    );
  };

  const getEntryFromId = (entryId, homeId) => {
    return db.query(
      `
      SELECT *
      FROM entries
      WHERE id = $1 AND home_id = $2
      `,
      [entryId, homeId]
    );
  };

  router.post("/", (req, res, next) => {
    const { userId, category, itemName, price, homeId } = req.body;
    createEntry(itemName, category, price, homeId)
      .then((response) => {
        createUsersEntry(userId, response.rows[0]["entryid"], homeId).then(
          (response) => {
            const entryId = response.rows[0]["entryid"];
            getUserFromId(userId, homeId).then((response) => {
              const user = response.rows[0];
              getEntryFromId(entryId, homeId).then((response) => {
                const entry = response.rows[0];
                res.send({ user, entry });
              });
            });
          }
        );
      })
      .catch((error) => {
        res.send(error);
      });
  });

  router.get("/:category/:homeId", (req, res, next) => {
    const category = req.params.category;
    const homeId = req.params.homeId;
    fetchEntriesByCategoryInHome(homeId, category)
      .then((response) => {
        res.send(response.rows);
      })
      .catch((error) => {
        res.send(error);
      });
  });

  return router;
};
