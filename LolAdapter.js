const LOL_DOMAIN = process.env.LOL_DOMAIN;
const API_KEY = process.env.API_KEY;
const request = require("request");

class LolAdapter
{
    /**
     * @param {object} transformer 
     */
    constructor(transformer)
    {
        //TODO: The transformer -may- need to be applied on a per-method basis instead of to the entire object.
        this.transformer = transformer;
    }

    getSummonerDataByName(name)
    {
        //TODO: Use both getSummonerData and getLeagueData to compile the results
    }

    /**
     * TODO: Return the summoner data instead of leveraging it directly
     * get summoner id by summoner name
     * @param {string} query summoner name
     */
    getSummonerData(query)
    {
        var urlId = LOL_DOMAIN + "/lol/summoner/v4/summoners/by-name/" + query + "?api_key=" + API_KEY; // summoner
        
        var self = this;
        var handler = function(body)
        {
            var summonerData = JSON.parse(body);
            var id = summonerData.id;
            self.getLeagueData(id);
        };

        this.handleResponse(urlId, handler);
    }
    
    /**
     * Get league entries in all queues for a given summoner ID
     * @param {string} id encrypted summoner ID
     */
    getLeagueData(id)
    {
        var urlLeague = LOL_DOMAIN + "/lol/league/v4/entries/by-summoner/" + id + "?api_key=" + API_KEY; // league

        
        var handler = function(body)
        {
            var leagueData = JSON.parse(body);

            return leagueData;
        };

        this.handleResponse(urlLeague, handler);
    }
    
    /**
     * @param {string} url API end point
     * @param {object} handler closure function
     */
    handleResponse(url, handler)
    {
        var self = this;
        request(url, function(error, response, body)
        {
            if(!error && response.statusCode == 200)
            {
                //TODO: This only works as expected if getSummonerData returns nothing.  Not a clean solution.
                response = handler(body);
                self.transformer(response);
            }
        });
    }
}

module.exports = LolAdapter;