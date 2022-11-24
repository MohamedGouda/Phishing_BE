const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./src/Database/connection");
const targetRoute = require("./src/Routes/target.route");
const userRoute = require("./src/Routes/user.route");


db.authenticate()
    .then(() => { 
        console.log("Database is connected ......") }
    )
    .catch((err) => console.log("Error in database connection", err));

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.send("Welcome In Home...........");
});

app.use(targetRoute);
app.use(userRoute);


app.listen(3001, () => {
    console.log("app running.......");
});

module.exports = app;
