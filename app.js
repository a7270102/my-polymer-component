var express = require('express');
var app = express();


app.use(express.static('src/webapp'));
app.get("/index.html", function(req, res){
    res.sendFile(__dirname + "/" + "index.html");
})

var server = app.listen(8081);
