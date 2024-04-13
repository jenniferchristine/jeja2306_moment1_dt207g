const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql");

app.set("view engine", "ejs");
app.use(express.static("public"));

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

// ROUTE FÖR ATT HÄMTA DATA TILL INDEX
app.get("/", (req, res) => {
    connection.query("SELECT * FROM courses", (err, results) => {
        if (err) {
            console.error('Error fetching data from courses table: ', err);
            return;
        }
        // Skicka kurserna till EJS-vyn för rendering
        res.render("index", { courses: results });
    });
});


app.get("/addcourse", (req, res) => {          // Lägg till kurser i formulär | kurskod, kursnamn, kursplan, kursprogression |
    res.render("addcourse")
});


app.get("/about", (req, res) => {             // Beskrivning av sida | syfte, databas, slutsats |
    res.render("about") 
});

// STARTA
app.listen(port, () => {
    console.log("Server started on port: " + port);
})