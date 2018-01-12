var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require ("cheerio");
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/MogulNotes";



var db = require("./models");

var PORT = process.env.PORT || 3002;


var app = express();


app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));

app.use(express.static("client/build"));

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI,{
  useMongoClient: true
});


app.get("/scrape", function(req, res) {

  axios.get("https://smallbiztrends.com/").then(function(response) {

    var $ = cheerio.load(response.data);


    $("h2").each(function(i, element) {

      var result = {};


      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");


        db.Article
          .create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      });
  });
});


//
app.get("/articles", function(req, res) {

  db.Article
    .find({})
    .then(function(dbArticle) {

      res.json(dbArticle);
    })
    .catch(function(err) {

      res.json(err);
    });
});

app.post("/articles", function (req,res){
  db.Article
    .create(req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
})

// app.get("/articles/:id", function(req, res) {
//
//   db.Article
//     .findOne({ _id: req.params.id })
//
//     .populate("note")
//     .then(function(dbArticle) {
//
//       res.json(dbArticle);
//     })
//     .catch(function(err) {
//
//       res.json(err);
//     });
// });
//
app.post("/articles/:id", function(req, res) {
  db.Article
      .findOne({ _id: req.params.id })
      .populate("note")
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {

        res.json(err);
      });
  });
//

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
