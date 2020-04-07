function isFullName(fullName) {
	const parts = fullName.split(' ');
	return parts.length === 2;
}

module.exports = isFullName;
