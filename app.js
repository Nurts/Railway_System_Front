const PORT = process.env.PORT || 3000;
const http = require( 'http' )
var express = require("express")
const path = require('path')
var cors = require('cors')
const fs = require('fs')
const port = 3000
var app = express(); 

app.use(cors());
app.use(express.static(__dirname));

app.get("/login", function(req, res){
  res.sendFile(path.join(__dirname, 'loginpage.html'));
});

app.get("/", function(req, res){
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get("/profile", function(req, res){
  res.sendFile(path.join(__dirname, 'cabinet.html'));
});

app.get("/registration", function(req, res){
  res.sendFile(path.join(__dirname, 'registration.html'));
});

app.get("/create", function(req, res){
  res.sendFile(path.join(__dirname, 'ticketCreation.html'));
});

app.get("/employees", function(req, res){
  res.sendFile(path.join(__dirname, 'employee.html'));
});

app.listen(PORT, function() {
  console.log(`Listening on Port ${PORT}`);
});
