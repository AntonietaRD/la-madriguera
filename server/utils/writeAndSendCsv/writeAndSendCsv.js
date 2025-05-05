	const {createObjectCsvWriter} = require("csv-writer");
	const path = require("path");
	const fs = require("fs");

	function writeAndSendCsv(data, res, filename) {
		const csvWriter = createObjectCsvWriter(
			{
				path: path.join(__dirname, filename),
				header: Object.keys(data[0]).map(key => ({id: key, title: key}))
			}
		)

		csvWriter.writeRecords(data)
			.then(() => {
				res.download(path.join(__dirname, filename), filename, (err) => {
					if (err) {
						res.status(500).json({error: 'Error al intentar descargar el archivo'});
					}

					fs.unlinkSync(path.join(__dirname, filename));
				});
			})
			.catch(err => {
				res.status(500).send('Error al intentar escribir el archivo');
			})
	}

	module.exports = writeAndSendCsv;