const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000; // START SERVER ON NEXT AVAILABLE PORT OR PORT 3000 //

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// CREATE A PATH TO PUBLIC FOLDER THAT HOLDS ASSETS AND HTML FILES //
app.use(express.static(path.join(__dirname, "public")));

