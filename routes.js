const express = require("express");
const router = express.Router();
const API_KEY = process.env.API_KEY;
const LolAdapter = require("./LolAdapter.js");

router.get("/", function(req, res){
    res.render("search", {key: API_KEY});
});

router.get("/results", function(req, res)
{
    var transformer = function (response) {
        //TODO: Call a Transformer class that can alter the content of 'response' to suit your 'index' View

        response && res.render("index", {leagueData: response});
    };

    var query = req.query.search;
    var adapter = new LolAdapter(transformer);
    adapter.getSummonerDataByName(query);

});

module.exports = router;
