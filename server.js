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
    if (err) {
        console.error("Could not connect to database" + err);
        return;
    } else {
        console.log("Connected to database...");
    }
});

app.get("/", async (req, res) => { // route för att hämta data till index
    try {
        const result = await client.query(`SELECT * FROM courses ORDER BY id DESC;`);
        res.render("index", { courses: result.rows }); // skicka kurserna till vyn för rendering
    } catch (error) {
        console.error('Error fetching data from courses table: ', err);
        res.status(500).send("Failed to fetch courses from database");
        return;
    }
});

app.get("/delete/:id", async (req, res) => {
    const id = req.params.id;

    try {
        await client.query(`DELETE FROM courses WHERE id=$1`, [id]);
        res.redirect("/");
    } catch (error) {
        console.error("Error deleting course: ", error);
        res.status(500).send("Failed to delete course from database");
        return;
    }
});

app.get("/addcourse", (req, res) => { // route för addcourse-sidan
    res.render("addcourse");
});

app.post("/addcourse", async (req, res) => {
    const coursename = req.body.coursename;
    const coursecode = req.body.coursecode;
    const syllabus = req.body.syllabus;
    const progression = req.body.progression;

    if (!coursename || !coursecode || !syllabus || !progression) { // validering
        return res.send(`
            <script>
                alert('Alla fält måste fyllas i.');
                window.history.back(); // gå tillbaka till addcourse-sida
            </script>
        `);
    }
    try {
        await client.query("INSERT INTO courses (coursename, coursecode, syllabus, progression) VALUES ($1, $2, $3, $4)",
        [coursename, coursecode, syllabus, progression]);

        console.log("Course added");
        res.status(200).redirect("/");
    } catch (error) {
        console.error("Could not add course", error);
        res.status(500).send("Failed to add course");
    }
});

app.get("/about", (req, res) => {
    res.render("about")
});

app.listen(process.env.PORT, () => { // starta
    console.log("Server started on port: " + process.env.PORT);
});