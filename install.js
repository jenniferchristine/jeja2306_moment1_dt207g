const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", 
    database: ""
});

connection.connect((err) => {
    if (err) {
        console.log("Connection failed: " + err);
        return;
    }
    console.log("Connected to MySql");
});