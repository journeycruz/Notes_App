const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000; // START SERVER ON NEXT AVAILABLE PORT OR PORT 3000 //

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// CREATE A PATH TO PUBLIC FOLDER THAT HOLDS ASSETS AND HTML FILES //
app.use(express.static(path.join(__dirname, "public")));

// SEND RESPONSE TO INDEX.HTML
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// SEND NOTES TO NOTES.HTML
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// SAVED NOTES GO TO DB.JSON
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "db/db.json"));
});

// POST NEW NOTE
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


// DELETE NOTE
app.delete("/api/notes/:id", (req, res) => {
    let deleteNote = req.params.id;
    fs.readFile("db/db.json", (err, data) => {
        if (err) throw err;
        let notes = JSON.parse(data);
        for (let i = 0; i < notes.length; i++) {
            if(notes[i].id === deleteNote) {
                notes.splice(i, 1);
                fs.writeFile("db/db.json", JSON.stringify(notes), (err) => {
                    if (err) throw err;
                    return res.json(notes);
                });
            }
        }
    });
});

// SHOW EXPRESS IS LISTENING ON PORT __ 
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));