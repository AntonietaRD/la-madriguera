const mysql = require("mysql2");
const config = require("../config");

const pool = mysql.createPool({
	host: config.host,
	user: config.db_user,
	password: config.db_password,
	database: config.db_name,
	charset: config.charset
})

module.exports = pool.promise();