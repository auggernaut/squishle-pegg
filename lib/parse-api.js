'use strict';

var Parse = require('node-parse-api').Parse;

module.exports = function (options) {
  if (!options) {
    options = {};
  }
  return new Module(options);
};

var Module = function (options) {
  this.app = new Parse(options.app_id, options.master_key);
  return this;
};

Module.prototype = {
  insertCard: function (doc, cb) {
    var _self = this;
    this.app.find('Card', {squishleId: doc.guid}, function (err, res) {
      if (err) cb(err);
      else {
        if (res.results.length > 0) {
          handleChoice(res.results[0].objectId, doc, 1);
        }
        else {
          var categories = doc.categories.map(function(cat){
            return cat.name;
          });
          _self.app.insert('Card', {question: doc.title, squishleId: doc.guid, categories: categories}, function (err, data) {
            if (err) cb(err);
            else {
              handleChoice(data.objectId, doc, 1);
            }
          });
        }
      }
    });
    function handleChoice(cardId, doc, index) {
      _self._insertChoice(cardId, doc, index, function (err, data) {
        if (err) cb(err);
        else {
          if (index < 5) {
            handleChoice(cardId, doc, index + 1);
          }
          else {
            handleCategory(cardId, doc, 0);
          }
        }
      });
    }
    function handleCategory(cardId, doc, index) {
      var categories = doc.categories;
      if (categories.length > 0) {
        _self._insertCategory(categories[index], function (err, categoryId) {
          if (err) cb(err);
//          else {
//            _self._insertCardCategory(cardId, categoryId, function (err, data) {
//              if (err) cb(err);
//              else {
//                if (index < categories.length - 1) {
//                  handleCategory(cardId, doc, index + 1);
//                }
//                else {
//                  cb(null, true);
//                }
//              }
//            });
//          }
        });
      }
      else {
        cb(null, true);
      }
    }
  },

  _insertChoice: function (cardId, doc, index, cb) {
    var _self = this;
    var img = doc['image' + index]
      , txt = doc['caption' + index];

    var cardPointer = {
      "__type": "Pointer",
      "className": "Card",
      "objectId": cardId
    };

    if (img === '' && txt === '') {
      cb(null, 'skiped');
    }
    else {
      this.app.find('Choice', {card: cardPointer}, function (err, res) {
        if (err) cb(err);
        else {
          var choices = res.results;
          var found = -1;
          if (choices.length > 0) {
            for (var i = 0; i < choices.length; i++) {
              if (choices[i].image === img && choices[i].text === txt) {
                found = i;
                break;
              }
            }
          }
          if (found > -1) {
            cb(null, choices[found].objectId);
          }
          else {
            _self.app.insert('Choice', {card: cardPointer, image: img, text: txt}, function (err, data) {
              if (err) cb(err);
              else {
                cb(null, data.objectId);
              }
            });
          }
        }
      });
    }
  },

  _insertCategory: function (cat, cb) {
    var _self = this;
    this.app.find('Category', {name: cat.name}, function (err, res) {
      if (err) cb(err);
      else {
        if (res.results.length > 0) {
          cb(null, res.results[0].objectId);
        }
        else {
          _self.app.insert('Category', {iconUrl: cat._id, name: cat.name}, function (err, data) {
            if (err) cb(err);
            else {
              cb(null, data.objectId);
            }
          });
        }
      }
    });
  },

  _insertCardCategory: function (cardId, categoryId, cb) {
    var _self = this;

    var cardPointer = {
      "__type": "Pointer",
      "className": "Card",
      "objectId": cardId
    };


    var categoryPointer = {
      "__type": "Pointer",
      "className": "Category",
      "objectId": categoryId
    };


    this.app.find('CardCategory', {card: cardPointer, category: categoryPointer}, function (err, res) {
      if (err) cb(err);
      else {
        if (res.results.length > 0) {
          cb(null, res.results[0].objectId);
        }
        else {
          _self.app.insert('CardCategory', {card: cardPointer, category: categoryPointer}, function (err, data) {
            if (err) cb(err);
            else {
              cb(null, data.objectId);
            }
          });
        }
      }
    });
  }
}
