const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000; // START SERVER ON NEXT AVAILABLE PORT OR PORT 3000 //

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// CREATE A PATH TO PUBLIC FOLDER THAT HOLDS ASSETS AND HTML FILES //
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});


app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});


app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "db/db.json"));
});


app.post("/api/notes", (req, res) => {
    let newNote = req.body;

    fs.readFile("db/db.json", (err, data) => {
        if (err) throw err;
        let notes = JSON.parse(data);
        notes.push(newNote);

        fs.writeFile("db/db.json", JSON.stringify(notes), (err) => {
            if (err) throw err;
            console.log("Successfully wrote file");
            return res.json(newNote);
        });
    });
});

