'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Request = new Schema({  
  firstBook: { type: Schema.Types.ObjectId, ref: 'Book' },
  secondBook: { type: Schema.Types.ObjectId, ref: 'Book' },
  approved: Boolean,
  completed: Boolean  
});

module.exports = mongoose.model('Request', Request);