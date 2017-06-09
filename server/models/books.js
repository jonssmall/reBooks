'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Book = new Schema({
  name: String,
  author: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Book', Book);