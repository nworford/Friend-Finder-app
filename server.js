var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var routes = require('./routing/htmlRoutes.js');
var apiRoutes = require('./routing/apiRoutes.js');

var app = express();
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use("/", routes);
app.use("/api", apiRoutes);

var server = app.listen(8080,() => {
    var host = server.address().address;
    var port = server.address().port;
    console.log("listening at ", host, port);
});