var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var routes = require('./routing/htmlRoutes.js');
var apiRoutes = require('./routing/apiRoutes.js');
const PORT = process.env.PORT || 8080;
var app = express();
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use("/", routes);
app.use("/api", apiRoutes);

app.listen(PORT, (err)=>{
if(!err) {
    console.log('listening on port: ' + PORT);
}
});