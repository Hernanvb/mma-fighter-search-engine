var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mma = require('mma');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// INDEX
app.get("/", function(req, res) {
    res.render("index");
});

// SEARCH
app.post("/", function(req, res) {
    mma.fighter(req.body.name, function(data) {
        res.render("show", {data: data});
        console.log(data);
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server started!!");
});