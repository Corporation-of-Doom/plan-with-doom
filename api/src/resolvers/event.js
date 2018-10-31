const { db } = require("../db");

async function queryEventByID(id) {
  return await db
    .raw("select * from Event where id = ?;", [id])
    .then(res => {
      return res.rows[0];
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
}

/*async function getMyEvents(user_id, event_type = null) {
  var querystring;
  if (event_type) {
  } else {
    querystring = "select * from Event where id = ?;";
  }
  return await db
    .raw(querystring, [id])
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
}

*/
module.exports = { queryEventByID, searchEvents };
