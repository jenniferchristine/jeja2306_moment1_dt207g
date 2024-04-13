const { Client } = require("pg");
require("dotenv").config();

// Anslut
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

client.query(`
    DROP TABLE IF EXISTS courses;
    CREATE TABLE courses(
        id          SERIAL PRIMARY KEY,
        coursename  VARCHAR(255) NOT NULL,
        coursecode  VARCHAR(50) NOT NULL,
        syllabus    VARCHAR(255) NOT NULL,
        progression CHAR(1) NOT NULL
    )
`);

/* 

// SKAPA TABELL
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


// LÄGG TILL DATA
connection.query(`
    INSERT INTO courses (coursename, coursecode, syllabus, progression)
    VALUES 
    ('Webbutveckling 1', 'DT057G', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT057G/', 'A'),
    ('Introduktion till programmering i JavaScript', 'DT084G', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT084G/', 'A'),
    ('Grafisk teknik för webb', 'DT2004G', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT200G/', 'A'),
    ('Webbanvändbarhet', 'DT068G', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT068G/', 'B'),
    ('Databaser', 'DT003G', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT003G/', 'A'),
    ('Frontend-baserad webbutveckling', 'DT211G', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT211G/', 'B'),
    ('Backend-baserad webbutveckling', 'DT207G', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT207G/', 'B'),
    ('Programmering i TypeScript', 'DT208G', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT208G/', 'B'),
    ('Projektledning', 'IK060G', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/IK060G/', 'A'),
    ('Programmering i C#.NET', 'DT071G', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT071G/', 'A'),
    ('Fullstack-utveckling med ramverk', 'DT193G', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT193G/', 'B'),
    ('Webbutveckling för WordPress', 'DT209G', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT209G/', 'B'),
    ('Webbutveckling med .NET', 'DT191G', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT191G/', 'B'),
    ('Fördjupad frontend-utveckling', 'DT210G', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT210G/', 'B'),
    ('Självständigt arbete', 'DT140G', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT140G/', 'B')
`, 
(err, results) => {
    if (err) {
        console.error('Error inserting data into courses table: ', err);
        return;
    }
    console.log('Data inserted successfully ' + results);
});

*/