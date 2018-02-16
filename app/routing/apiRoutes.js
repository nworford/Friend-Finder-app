var express = require("express");
var router = express.Router();
var path = require("path");
var bodyParser = require('body-parser');
var formParser = bodyParser.urlencoded({extended:false});
var friends = require("../data/friends.js");
var fs = require("fs");
var matcher = require("../logic/matcher.js");


console.log(friends);
router.get("/friends", (req, res) => {
    // res.send("home");
    res.sendFile(path.join(__dirname, "../public/home.html"));
});

router.post("/friends", formParser, (req, res) => {
    // res.sendFile(path.join(__dirname, "../public/survey.html"));
    var newFriend = {
        name:req.body.name,
        photo:req.body.photo,
        scores:[]
    };
    var i = 1;
    while(req.body["q" + i]){
        newFriend.scores.push(req.body["q" + i]);
        i++;
    }
    var bestie = matcher(newFriend, friends);
    friends.push(newFriend);
    var text = "module.exports=" + JSON.stringify(friends);
    fs.writeFile(path.join(__dirname, "../data/friends.js"), text, (error)=>{
        if(error){
            return console.log(error);
        }
        console.log("Friends updated.");
        if(bestie === null){
            res.send("You are the first Friend on the list");
        }
        else {
                res.render("results", bestie);
            // res.send("Your best match is: " + bestie.name + " with a score of: " + bestie.difference);
        }
    });
});

module.exports = router;