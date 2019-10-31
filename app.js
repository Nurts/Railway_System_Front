const PORT = process.env.PORT || 3000;
const http = require( 'http' )
var express = require("express")
const path = require('path')
var cors = require('cors')
const fs = require('fs')
const port = 3000
var app = express(); 

app.use(cors());
// app.use(express.static(__dirname));

app.get("/login", function(req, res){
  res.sendFile(path.join(__dirname, 'loginpage.html'));
});

app.get("/", function(req, res){
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get("/redir", function(req, res){
  console.log("redir")
  res.redirect('/');
});

// const server = http.createServer(function(req, res){
//   res.writeHead(200, {'Content-Type': 'text/html'})
//   fs.readFile('loginpage.html', function(error, data){
//     if(error){
//       res.writeHead(404)
//       res.write('Error: File not found')
//     } else{
//       res.write(data)
//     }
//     res.end()
//   })
// })

// server.listen(port, function(error) {
//   if(error){
//     console.log('Something went wrong', error)
//   }else{
//     console.log('Server is listening on port ' + port)
//   }
// })
app.listen(PORT, function() {
  console.log(`Listening on Port ${PORT}`);
});