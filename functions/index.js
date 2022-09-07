const functions = require("firebase-functions");

const express = require("express");
const app = express();

const ejsMate = require("ejs-mate");

const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, 'public')))



const examplesRoute = require('./routes/examples');


app.use("/", examplesRoute);


app.get("/", (req, res) => {
    res.render("index");
})


exports.app = functions.https.onRequest(app);

const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})