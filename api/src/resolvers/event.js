const { db } = require("../db");

async function getEvent(id) {
  return await db
    .raw("select * from Event where id = ?;", [id])
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
}

module.exports = { getEvent };
