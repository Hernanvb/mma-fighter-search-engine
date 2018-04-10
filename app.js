var express = require("express");
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var app = express();
var bodyParser = require("body-parser");
var mma = require('mma');
var GoogleImages = require('google-images');
var client = new GoogleImages(process.env.CSE_ID, process.env.API_KEY);

app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// FLASH message
// app.get('/flash', function(req, res){
//   // Set a flash message by passing the key, followed by the value, to req.flash().
//   req.flash('info', 'Invalid Fighter Request!');
//   res.redirect('/');
// });

// INDEX
app.get("/", function(req, res) {
    res.render("index", { info: req.flash('info') });
});

// SEARCH
app.post("/", function(req, res) {
    mma.fighter(req.body.name, function(data) {
        if (data) {
            var rate = 0;
            var promises = [];
            
            rate = Math.floor((data.strikes.successful / data.strikes.attempted) * 100);
            data.strikes.rate = rate;
            rate = Math.floor((data.takedowns.successful / data.takedowns.attempted) * 100);
            data.takedowns.rate = rate;
            
            // if thre is info for the fighter but the name or full name is 
            // not specified, then add the user query as the fighter's name
            if (data.name.length == 0 && data.fullname.length == 0)
                data.fullname = req.body.name;

            // use google-images API to search for fight posters
            data.fights.forEach(function(fight) {
                if (fight.name.length > 0 && fight.name.includes('UFC')) {
                    var query = fight.name + ' poster';
                    promises.push(
                        client.search(query, {size: 'large'})
                    	.then(images => {
                            fight.poster = images[0].url;
                         //   console.log(fight.poster);
                    	})
                    	.catch((e) => {
                    	    console.log("Google Image Search Promise Error", e);
                    	}));         
                }
            });
            
            Promise.all(promises)
            .then(() => {
                console.log(data);
                res.render("show", {data: data});
            });
            // .catch((e) => {
            //     // handle errors here
            //     console.log("Promise Error");
            // });
            
            /*
            data.fights.forEach(function(fight) {
                if (fight.name.length > 0) {
                    getPosterInfo(fight, function (posterUrl) {
                        fight.poster = posterUrl;
                        console.log(fight);
                    });
                }
            });
            */

            // res.render("show", {data: data});            

        } else {
            req.flash("info", "Invalid Fighter Name Requested");
            //res.send(JSON.stringify(req.flash("info", "Invalid Fighter")));
            res.redirect("/");
            //res.send("Invalid Fighter Request!!");
        }
    });
});

function getPosterInfo (fight, callback) {
    // use google-images API to search for fight posters
    client.search(fight.name, {size: 'xlarge'})
    	.then(images => {
            callback(images[0].url);
    	});
}

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server started!!");
});