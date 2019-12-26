var express = require("express");
var request = require("request");
var app = express();
require('dotenv').config();
const API_KEY = process.env.API_KEY;
const LOL_DOMAIN = process.env.LOL_DOMAIN;
app.set("view engine", "pug");

app.get("/", function(req, res){
    res.render("search", {key: API_KEY});
});

app.get("/results", function(req, res)
{
    var query = req.query.search;
    var urlId = LOL_DOMAIN + "/lol/summoner/v4/summoners/by-name/" + query + "?api_key=" + API_KEY; // summoner

    var handler = function(body, res) 
    {
        var summonerData = JSON.parse(body);
        var id = summonerData.id;
        getLeagueData(id, res);
    };

    handleResponse(urlId, handler, res);
});

/**
 * Get league entries in all queues for a given summoner ID
 * @param {string} id encrypted summoner ID
 * @param {object} res 
 */
function getLeagueData(id, res)
{
    var urlLeague = LOL_DOMAIN + "/lol/league/v4/entries/by-summoner/" + id + "?api_key=" + API_KEY; // league

    var handler = function(body, res) 
    {
        var leagueData = JSON.parse(body);
        res.render("index", {leagueData: leagueData});
    };

    handleResponse(urlLeague, handler, res);
}

/**
 * @param {string} url API end point
 * @param {object} handler closure function
 * @param {object} res 
 */
function handleResponse(url, handler, res)
{
    request(url, function(error, response, body)
    {
        if(!error && response.statusCode == 200)
        {
           handler(body, res);
        }
    });
}

app.listen(3000, function()
{
    console.log("Listening on port 3000");
});
