const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "dt207g-1",
    password: "database123", 
    database: "dt207g-1"
});

connection.connect((err) => {
    if (err) {
        console.error("Connection failed: " + err);
        return;
    }
    console.log("Connected to MySql");
});

/*connection.query("CREATE DATABASE dt207_lab1;", (err, results) => {
    if (err) throw err;

    console.log("Database created: " + results);
});*/
connection.query("DROP TABLE IF EXISTS courses;", (err, results) => {
    if (err) throw err;
    console.log("Courses is deleted");
});

connection.query(`CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    coursecode VARCHAR(50) NOT NULL,
    coursename VARCHAR(255) NOT NULL,
    syllabus VARCHAR(255) NOT NULL,
    progression CHAR(1) NOT NULL)`, (err, results) => {

        if (err) {
    console.error('Error creating table: ', err);
    return;
}
console.log('Table created successfully' + results);
});