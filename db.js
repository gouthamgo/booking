const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://itsme:notok@cluster0.gpfej.mongodb.net/mern-rooms?retryWrites=true&w=majority'


mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true});

var connection = mongoose.connection

connection.on('error', ()=>{
    console.log('Mongo DB connection failed');
})

connection.on('connected', ()=>{
    console.log('Mongo DB connection worked');
})


module.exports = mongoose


