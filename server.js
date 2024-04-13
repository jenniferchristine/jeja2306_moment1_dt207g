const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql");

app.set("view engine", "ejs");
app.use(express.static("public")); // statiska filer
app.use(express.urlencoded({ extended: true })); // tolka post


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


app.get("/", (req, res) => { // route för att hämta data till index
    connection.query("SELECT * FROM courses", (err, results) => {
        if (err) {
            console.error('Error fetching data from courses table: ', err);
            return;
        }

        res.render("index", { courses: results }); // skicka kurserna till vyn för rendering
    });
});


app.get("/addcourse", (req, res) => { // route för addcourse-sidan
    res.render("addcourse");
});


app.post("/addcourse", (req, res) => { // hantera post-förfrågningar
    const coursename = req.body.coursename;
    const coursecode = req.body.coursecode;
    const syllabus = req.body.syllabus;
    const progression = req.body.progression;
  
    const sql = "INSERT INTO courses (coursename, coursecode, syllabus, progression) VALUES (?, ?, ?, ?)"; // insert till databas
    const values = [coursename, coursecode, syllabus, progression];
  
    connection.query(sql, values, (err, result) => { // utför sql-frågan
      if (err) {
        console.error("Error inserting data: ", err);
        res.status(500).send("Error inserting data into database");
        return;
      }
      console.log("Kurs tillagd");
      res.redirect("/"); // omdirigera till startsidan
    });
  });


app.get("/about", (req, res) => {
    res.render("about") 
});


app.listen(port, () => { // starta
    console.log("Server started on port: " + port);
});