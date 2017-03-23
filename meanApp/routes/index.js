var express = require('express');
var router = express.Router();
var jokes = require("../model/jokes");
var session = require("express-session");

router.get("/", function (req, res) {
    res.render('index', { title: 'Jokes', name: session.userName });
    console.log('Cookies: ', req.cookies);
});


router.get("/login", function(req,res){
    res.render('login');
});

router.get("/jokes", function (req, res) {
    res.render('jokes', { jokes: jokes.allJokes});
});

router.get("/random", function (req, res) {
    res.render('jokes', {jokes: jokes.getRandomJoke});
});

router.get("/addjoke", function (req, res) {
    res.render('addjoke', { jokes: jokes.allJokes});
});

router.post('/addjoke', function(req, res, next){
  jokes.addJoke(req.body.addjoke)
  res.redirect('addjoke')
});

module.exports = router;
