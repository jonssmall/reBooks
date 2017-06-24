'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
	github: {
		id: String,
		displayName: String,
		username: String,
        publicRepos: Number
	},
	name: String,
	city: String,
	state: String,
	books : [{ type: Schema.Types.ObjectId, ref: 'Book' }],
	requestHistory: [{ 
		myBook: String, 
		otherBook: String, 
		outcome: String 
	}]	
});

module.exports = mongoose.model('User', User);