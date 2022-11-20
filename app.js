const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//var userRoute= require ('./Routes/authorRoute')


const app= express();



app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



///app.use('/api' , userRoute);

app.get('/' , (req , res)=>{
    res.send("Welcome In Home...........");
})

app.listen(3000 , ()=>{
    console.log('app running.......')
});

module.exports = app;