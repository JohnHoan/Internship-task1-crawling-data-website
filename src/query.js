const mysql = require("mysql2");
// create the connection to database
const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "20041999",
	database: "johninternship",
});

// insert to domains
const insertDomain = async (domain, id) => {
	const sql =
		"INSERT INTO domains(id,domain) SELECT * FROM (SELECT ? AS id, ? AS domain)\
        AS temp WHERE NOT EXISTS (SELECT id,domain FROM domains WHERE id=? AND domain = ?) LIMIT 1";
	await connection.query(
		sql,
		[id, domain, id, domain],
		function (err, results, fields) {
			// console.log(results); results contains rows returned by server
			if (results.insertId) {
				console.log("Domain Inserted successful");
			}
		}
	);
};

// insert to emails
const insertEmail = (email, domain_id) => {
	const sql =
		"INSERT INTO emails(email,domain_id) SELECT * FROM (SELECT ? AS email, ? AS domain_id)\
	AS temp WHERE NOT EXISTS (SELECT email,domain_id FROM emails WHERE email = ? AND domain_id=?) LIMIT 1";
	connection.query(
		sql,
		[email, domain_id, email, domain_id],
		function (err, results, fields) {
			// console.log(results); results contains rows returned by server
			if (results.affectedRows) {
				console.log("Email Inserted successful");
			}
		}
	);
};

// insert to phone_numbers
const insertPhoneNumbers = (num, domain_id) => {
	const sql =
		" INSERT INTO phone_numbers(phone_number,domain_id) SELECT * FROM (SELECT ? AS phone_number, ? AS domain_id) AS temp \
	WHERE NOT EXISTS (SELECT phone_number,domain_id FROM phone_numbers WHERE phone_number = ? AND domain_id=?) LIMIT 1;";
	connection.query(
		sql,
		[num, domain_id, num, domain_id],
		function (err, results, fields) {
			// console.log(results); results contains rows returned by server
			if (results.affectedRows) {
				console.log("Phone-number Inserted successful");
			}
		}
	);
};

// display table
const display = (table) => {
	const sql = "SELECT * FROM ? WHERE 1";
	connection.query(sql, [table], function (err, results, fields) {
		console.log(results); // results contains rows returned by server
	});
};

module.exports = {
	insertDomain,
	insertEmail,
	insertPhoneNumbers,
	display,
};

/*const [result, fields] = await pool.execute(
            `INSERT INTO website (domain, online_gov_id, company_id, logo_link, verified, service_type, availability) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                domain, onlineGovId, company_id, logo_link, verified, service_type, availability
            ]
        );

        if (result.affectedRows) {
            console.log(`Website ${domain} created successfully`);
            return {id : result.insertId};
        }
        consol
		

select * 
from domain
left join emails 
on domain .id = emails.dommain_id
where emails.id is null 		*/
