const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public")); // Statiska filer

// Visar kurser | kurskod, kursnamn, kursplan, kursprogression, ta bort kurs |
app.get("/", (req, res) => { // ROUTE
    res.render("index") 
});

// Lägg till kurser i formulär | kurskod, kursnamn, kursplan, kursprogression |
app.get("/addcourse", (req, res) => {
    /*const courseList = [
        {
            id:
            coursecode:
            coursename:
            syllabus: 
            progression:

        }
    ]*/
    res.render("addcourse")
});

//app.post("/")

// Beskrivning av sida | syfte, databas, slutsats |
app.get("/about", (req, res) => {
    res.render("about") 
});

// STARTA
app.listen(port, () => {
    console.log("Server started on port: " + port);
})