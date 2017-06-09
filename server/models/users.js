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
	City: String,
	State: String,
	books : [{ type: Schema.Types.ObjectId, ref: 'Book' }],
	requests : [{ type: Schema.Types.ObjectId, ref: 'Request' }]
});

module.exports = mongoose.model('User', User);