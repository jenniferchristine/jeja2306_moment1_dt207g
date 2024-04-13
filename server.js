const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));


app.get("/", (req, res) => {                    // Visar kurser | kurskod, kursnamn, kursplan, kursprogression, ta bort kurs |
        res.render("index");
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