const LOL_DOMAIN = process.env.LOL_DOMAIN;
const API_KEY = process.env.API_KEY;
const request = require("request");

class LolAdapter
{
    /**
     * @param {object} callback
     */
    constructor(callback)
    {
        this.callback = callback;
        this.domain = LOL_DOMAIN;
    }

    getSummonerDataByName(name)
    {
        //'self' is the instance that still has an awareness of the original callback set by the controller
        var self = this;
        var callback = function(data)
        {
            var id = data.id;
            self.getLeagueData(id);
        };

        //We need a clean instance of this class for the first step to this process flow
        var adapter = new this(callback);

        adapter.getSummonerData(name);

        //TODO: A cleaner solution might be to chain promises
    }

    /**
     * get summoner id by summoner name
     * @param {string} query summoner name
     */
    getSummonerData(query)
    {
        var urlId = "lol/summoner/v4/summoners/by-name/" + query + "?api_key=" + API_KEY; // summoner

        return this.handleResponse(urlId);
    }
    
    /**
     * Get league entries in all queues for a given summoner ID
     * @param {string} id encrypted summoner ID
     */
    getLeagueData(id)
    {
        var urlLeague = "lol/league/v4/entries/by-summoner/" + id + "?api_key=" + API_KEY; // league

        return this.handleResponse(urlLeague);
    }
    
    /**
     * @param {string} endpoint API end point
     * @param {object|null} handler An opportunity for each endpoint to define it's own response transformations
     */
    handleResponse(endpoint, handler = null)
    {
        //TODO: May want to move the concatenation of the api_key GET variable to here as well, if it is a safe assumption that all endpoints in this adapter will require it.  May also be worth checking to see if the the API key can be included as an Authorization header instead of a GET variable.
        var url = this.domain + "/" + endpoint;

        //Default handler that just returns the data, so that supplying one can be optional
        handler = handler ? handler : function (data) {
            return data;
        };

        var self = this;
        var transaction = request(url, function(error, response, body)
        {
            if(!error && response.statusCode == 200)
            {
                var data = JSON.parse(body);
                response = handler(data);
                self.callback(response);
            }
        });

        return transaction;
    }
}

module.exports = LolAdapter;
