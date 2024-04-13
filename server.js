const { Client } = require("pg");
const express = require("express");
require("dotenv").config();

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public")); // statiska filer
app.use(express.urlencoded({ extended: true })); // tolka post

const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect((err) => {
    if (err) console.log("Fel vid anslutning..." + err);
    else console.log("Ansluten till databasen...");
});

app.get("/", async (req, res) => { // route för att hämta data till index
    client.query("SELECT * FROM courses", (err, result) => {
        if (err) {
            console.error('Error fetching data from courses table: ', err);
            return;
        }

        res.render("index", { courses: result.rows }); // skicka kurserna till vyn för rendering
    });
});

app.get("/delete/:id", async (req, res) => {
    const id = req.params.id;

    const result = await client.query(`
        DELETE FROM courses WHERE id=$1
    `, [id]);

    res.redirect("/");
});

app.get("/addcourse", (req, res) => { // route för addcourse-sidan
    res.render("addcourse");
});

app.post("/addcourse", async (req, res) => { // hantera post-förfrågningarna
    const coursename = req.body.coursename;
    const coursecode = req.body.coursecode;
    const syllabus = req.body.syllabus;
    const progression = req.body.progression;
  
    const result = await client.query("INSERT INTO courses (coursename, coursecode, syllabus, progression) VALUES ($1, $2, $3, $4)", 
    [coursename, coursecode, syllabus, progression], (err) => {

        if (err) {
            console.log("Could not add course")
        } else {
            console.log("Course added");
            res.redirect("/"); // omdirigera till startsidan     
        }
    });
  });


app.get("/about", (req, res) => {
    res.render("about") 
});


app.listen(process.env.PORT, () => { // starta
    console.log("Server started on port: " + process.env.PORT);
});