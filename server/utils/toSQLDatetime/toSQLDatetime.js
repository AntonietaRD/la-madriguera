const toSQLDatetime = (datetimeStr) => {
	// Extract the date and time parts from the string
	const [datePart, timePart] = datetimeStr.split('T');
	const timeWithoutOffset = timePart.split('-')[0].split('+')[0];
	const [hours, minutes] = timeWithoutOffset.split(':');

	return `${datePart} ${hours}:${minutes}`;
};

module.exports = toSQLDatetime;