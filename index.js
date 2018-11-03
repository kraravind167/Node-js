
const express = require('express');
const bodyParser = require('body-parser');

// Calling the express method

const app = express();
//  Express Middlware 
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// Datbase Configuration

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database

mongoose.connect(dbConfig.url , { useNewUrlParser:true})
.then(()=>{
    console.log("Successfully connected to database");
})
.catch(err => {
    console.log('Could not connect to database , Its exiting');
    process.exit();
});

// Defining a simple route

app.get('/', (req,res) => {
    res.json({"message":"Welcome to Application"});
});

// calling rotes from routes folder

require('./app/routes/notes.routes.js')(app);


app.listen(3000 , () => {
    console.log("Server is running on port 3000")
})