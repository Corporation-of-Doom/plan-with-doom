const { db } = require("../db");

async function getSeminar(id) {
	return await db
		.raw("select * from Seminar where id = ?;", [id])
		.then(res => {
			return res.rows[0];
		})
		.catch(err => {
			console.log(err);
			throw err;
		});
}

module.exports = { getSeminar };
