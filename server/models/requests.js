'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Request = new Schema({  
  FirstBook: { type: Schema.Types.ObjectId, ref: 'Book' },
  SecondBook: { type: Schema.Types.ObjectId, ref: 'Book' },
  Approved: Boolean,
  Completed: Boolean  
});

module.exports = mongoose.model('Request', Request);