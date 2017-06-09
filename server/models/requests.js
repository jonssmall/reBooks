'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Request = new Schema({  
  FirstBook: { type: Schema.Types.ObjectId, ref: 'Book' },
  SecondBook: { type: Schema.Types.ObjectId, ref: 'Book' },
  Approved: Boolean,
  Completed: Boolean  
});

module.exports = mongoose.model('Request', Request);