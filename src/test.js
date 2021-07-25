// get the client
const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "20041999",
	database: "johninternship",
});

// simple query
connection.query(
	"INSERT INTO domains(domain) SELECT * FROM (SELECT 'abc.com' AS domain)\
	AS temp WHERE NOT EXISTS (SELECT domain FROM domains WHERE domain = 'abc.com') LIMIT 1;",
	function (err, results, fields) {
		console.log(results); // results contains rows returned by server
		// console.log(fields); // fields contains extra meta data about results, if available
	}
);

connection.query(
	"INSERT INTO emails(email,domain_id) SELECT * FROM (SELECT 'abc@gmail.com' AS email, 9 AS domain_id)\
	AS temp WHERE NOT EXISTS (SELECT email,domain_id FROM emails WHERE email = 'abc@gmail.com' AND domain_id=9) LIMIT 1;",
	function (err, results, fields) {
		console.log(results); // results contains rows returned by server
		// console.log(fields); // fields contains extra meta data about results, if available
	}
);

connection.query(
	" INSERT INTO phone_numbers(phone_number,domain_id) SELECT * FROM (SELECT '0300433232' AS phone_number, 9 AS domain_id) AS temp \
	WHERE NOT EXISTS (SELECT phone_number,domain_id FROM phone_numbers WHERE phone_number = '0300433232' AND domain_id=9) LIMIT 1;",
	function (err, results, fields) {
		console.log(results); // results contains rows returned by server
		// console.log(fields); // fields contains extra meta data about results, if available
	}
);

// console.log(insertQuery);
connection.query(
	"SELECT * FROM phone_numbers WHERE 1",
	function (err, results, fields) {
		console.log(results); // results contains rows returned by server
		// console.log(fields); // fields contains extra meta data about results, if available
	}
);
