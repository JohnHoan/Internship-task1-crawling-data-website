const regex = require("./regex");
const fetch = require("node-fetch");
const fs = require("fs");
const query = require("./query");

/* Read domains*/

const readDomains = () => {
	let domains = [];
	fs.readFileSync("./src/domains.txt", "utf-8")
		.split(/\r?\n/)
		.forEach(function (line) {
			domains.push(line);
		});

	return [...new Set(domains)];
};

/* Crawl html */

const crawl = async ({ url }) => {
	const response = await fetch(url);
	const html = await response.text();
	return html;
};
/* Save html file to local  */
const saveFile = async (domains) => {
	for (let i = 0; i < domains.length; i++) {
		if (fs.existsSync(`./data/${domains[i]}.txt`)) continue;
		try {
			const url = `http://${domains[i]}/`;
			const html = await crawl({ url });
			fs.writeFile(`./data/${domains[i]}.txt`, html, (err) => {
				if (err) console.log("MET ERROR:", err);
			});
			console.log("Saved");
		} catch (error) {
			console.log("ERROR: Can not read url");
			continue;
		}
	}
};

async function main() {
	let start = new Date();
	let hrstart = process.hrtime();
	const domains = readDomains();
	await saveFile(domains);
	for (let i = 0; i < domains.length; i++) {
		try {
			const html = fs.readFileSync(`./data/${domains[i]}.txt`, "utf8");
			const emails = await regex.getEmails(html);
			const phoneNumbers = await regex.getPhoneNums(html);
			query.insertDomain(domains[i], i);
			for (let j = 0; j < emails.length; j++) {
				if (!emails[j]) break;
				query.insertEmail(emails[j], i);
			}
			for (let j = 0; j < phoneNumbers.length; j++) {
				if (!phoneNumbers[j]) break;
				query.insertPhoneNumbers(phoneNumbers[j], i);
			}
		} catch (e) {
			console.log(`${i}: ${domains[i]} => Error (Met some error))`);
		}
	}
	let end = new Date() - start;
	let hrend = process.hrtime(hrstart);
	console.log(`Execution time (hr): ${hrend[0]}`);
}

main();
