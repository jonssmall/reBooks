'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Book = new Schema({
  title: String,
  author: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },     
  trade: {
    book: { type: Schema.Types.ObjectId, ref: 'Book' }, //implied trade state of 'proposed' when not null
    approved: Boolean    
  }
});

module.exports = mongoose.model('Book', Book);