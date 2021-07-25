const getEmails = async (str) => {
	const regex = /[A-Za-z0-9\.]+@[A-Za-z0-9]+\.[A-Za-z]{2,10}/gm;
	let m;
	let emails = [];
	while ((m = regex.exec(str)) !== null) {
		// This is necessary to avoid infinite loops with zero-width matches
		if (m.index === regex.lastIndex) {
			regex.lastIndex++;
		}

		// The result can be accessed through the `m`-variable.
		m.forEach((match, groupIndex) => {
			// console.log( `Found match, group ${ groupIndex }: ${ match }` );
			if (!match.includes(".png", ".jpeg", ".gif")) {
				emails = [...emails, match.toLowerCase()];
			}
		});
	}
	const emailList = [...new Set(emails)];
	return emailList;
};

const getPhoneNums = async (str) => {
	const regex =
		/[0][9][0-9]{8}|[0][8][0-9]{8}|[0][7][0-9]{8}|[0][3][0-9]{8}|[0][5][0-9]{8}/gm;
	let m;
	let numbers = [];
	while ((m = regex.exec(str)) !== null) {
		// This is necessary to avoid infinite loops with zero-width matches
		if (m.index === regex.lastIndex) {
			regex.lastIndex++;
		}
		numbers = [...numbers, m[0]];
	}
	const numberList = [...new Set(numbers)];
	return numberList;
};

module.exports = {
	getEmails,
	getPhoneNums,
};
