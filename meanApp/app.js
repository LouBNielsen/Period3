var express = require('express');
var path = require('path');
var hbs = require('handlebars');
var routesIndex = require('./routes/index');
var bodyParser = require('body-parser');
var session = require('express-session')
var cookieParser = require('cookie-parser');
var request = require("request");


var app = express();

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function (req, res, next) {
  if (session.userName != null) {
    return next();
  }
  else if (req.body.userName != null) {
    session.userName = req.body.userName;
    return res.redirect("/");
  }
  req.url = "/login";
  return next();
});


app.use('/', routesIndex);
app.use("/session", session);

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 2000000 } }))
app.use(session({ secret: 'secret_3162735', saveUninitialized: true, resave: true }));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.listen(3000, function () {
  console.log("Server started, listening on: " + 3000);
})

/*
var options = {
  url: "http://localhost:3000/addjoke",
  method: "POST",
  json : true,
  body : {joke : "I'm a joke"}
}
request(options,function(error,res,body){
  console.log(body.joke); //Assume the service returns the new Joke
})
*/

