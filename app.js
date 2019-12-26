var express = require("express");
var app = express();
require("dotenv").config();
var routes = require("./routes.js");

app.set("view engine", "pug");
app.use("/", routes);

app.listen(process.env.PORT, function()
{
    console.log("Listening on port " + process.env.PORT);
});
