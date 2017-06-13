'use strict';

const userApi = require('../controllers/userAccess');
const bookApi = require('../controllers/bookAccess');
const path = process.cwd();

module.exports = (app, passport) => {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.status('401').send('Unauthorized');
		}
	}

	app.route('/')
		.get((req, res) => {
			const html = `
			<!DOCTYPE html>
			<html lang="en">
			<head>
    		<title>reBooks</title>
    		<meta charset="UTF-8">	
    		<meta name="viewport" content="width=device-width, initial-scale=1.0">	             
			</head>
			<body>
    		<div id="app"></div>
				<script type="text/javascript" charset="utf-8">
					window.USER = ${JSON.stringify(req.user)};					
				</script>
    		<script type="text/javascript" src="/app/index.js" charset="utf-8"></script>
			</body>
			</html>
			`;
			res.set('Content-Type', 'text/html').status(200).end(html);
		});

	app.route('/logout')
		.get((req, res) => {
			req.logout();
			res.redirect('/');
		});    
        
	app.route('/auth/github')
		.get((req, res) => {                  
			passport.authenticate('github')(req, res);
		});                    

  app.route('/auth/github/callback')
		.get((req, res, next) => {                                    
			passport.authenticate('github', {
				successRedirect: '/',
				failureRedirect: '/' //how to handle failure
			})(req, res, next);
		});

	app.route('/user')
		.put(isLoggedIn, userApi.updateLocation);

	app.route('/user/books')
		.get(isLoggedIn, bookApi.getMyBooks);

	app.route('/books')
		.post(isLoggedIn, bookApi.addBook);

	app.route('/books/:id')
		.delete(isLoggedIn, bookApi.deleteBook);

};