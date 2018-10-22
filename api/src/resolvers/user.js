const { db } = require("../db");

async function getUser(id) {
  return await db
    .raw("select * from doom_user where id = ?;", [id])
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
}

module.exports = { getUser };
