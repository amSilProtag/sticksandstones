var express = require('express');
var path = require('path');
var app = express();


app.get('/', function(req, res) { 
  console.log("sending index");
	res.sendFile(path.join(__dirname, 'index.html')) } 
)
;
app.use('/', express.static(path.join(__dirname)));
  

app.listen('8000');

console.log("listening on 8000", __dirname);
