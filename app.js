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
        if (data) {
            var rate = 0;
            rate = Math.floor((data.strikes.successful / data.strikes.attempted) * 100);
            data.strikes.rate = rate;
            rate = Math.floor((data.takedowns.successful / data.takedowns.attempted) * 100);
            data.takedowns.rate = rate;
            
            res.render("show", {data: data});
            console.log(data);
        } else {
            res.send("Invalid Fighter Request!!");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server started!!");
});