function connectToDb(db) {
	db.getConnection()
		.then(conn => {
			console.log('Successfully connected to the database');
			conn.release();
		})
		.catch(err => {
			console.error('Unable to connect to the database:', err);
		});
}

module.exports = connectToDb;
