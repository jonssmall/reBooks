'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Book = new Schema({
  name: String,
  author: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Book', Book);