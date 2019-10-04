var express = require("express");
var request = require("request");
var app = express();
require('dotenv').config();
var apiKey = process.env.API_KEY;
app.set("view engine", "pug");

app.get("/", function(req, res){
    res.render("search", {key: apiKey});
});

app.get("/results", function(req, res){
    var query = req.query.search;
    var urlId = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + query + "?api_key=" + apiKey; // summoner
    request(urlId, function(error, response, body){
        if(!error && response.statusCode == 200){
            var summonerData = JSON.parse(body);
            var id = summonerData.id;
            var urlLeague = "https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + id + "?api_key=" + apiKey; // league
            request(urlLeague, function(error, response, body){
                if(!error && response.statusCode == 200){
                    var leagueData = JSON.parse(body);
                    res.render("index", {leagueData: leagueData});
                }
            })
        }
    })
})

app.listen(3000, function(){
    console.log("Listening on port 3000");
});
