'use strict';

const express = require('express');
const routes = require('./routes/index.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

const app = express();
const router = express.Router({mergeParams: true});
require('dotenv').load();
require('./config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use('/app', express.static(process.cwd() + '/app'));
app.use(router);

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('trust proxy', true);

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log('Node.js listening on port ' + port + '...');
});