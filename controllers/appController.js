const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Article
       .find({})
       .then(function(dbArticle) {

         res.json(dbArticle);
       })
       .catch(function(err) {

         res.json(err);
       });,
  findById: function(req, res) {
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
  save: function(req, res) {
    db.Article
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createNote: function(req, res) {
    db.Note
  .create(req.body)
  .then(function(dbNote) {
    return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
  })
  .then(function(dbArticle) {

    res.json(dbArticle);
  })
  .catch(function(err) {

    res.json(err);
  });
},
  // updateNote: function(req, res) {
  //   db.Note
  //     .findById({ _id: req.params.id })
  //     .then(dbModel => dbModel.remove())
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  remove: function(req, res) {
    db.Article
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
