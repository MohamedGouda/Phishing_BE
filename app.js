const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./src/Database/pool')
const targetRoute = require('./src/Routes/target.route')


const app= express();



app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.get('/' , (req , res)=>{
    res.send("Welcome In Home...........");
})

app.use(targetRoute)

app.listen(3000 , ()=>{
    console.log('app running.......')
    db.connect()

});

module.exports = app;