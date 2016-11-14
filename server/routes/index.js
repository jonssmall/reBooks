'use strict';

let path = process.cwd();

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	app.route('/')
		.get((req, res) => {
			res.sendFile(path + '/app/index.html');
		});

	app.route('/login')
		.get(function (req, res) {
			// res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/');
		});

    app.route('/signedOn')
        .get(function(req, res) {
            res.send(req.isAuthenticated());
        })

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});	
        
	app.route('/auth/github')
		.get(function(req, res) {
            //forwarding unauthorized user to intended view
            //how to limit this to a single user's auth flow rather than server global?
            if (req.query.target) app.locals.target = req.query.target
            passport.authenticate('github')(req, res);
        });                    

    app.route('/auth/github/callback')
		.get(function(req, res) {            
            const redirect = app.locals.target ? '/#/' + app.locals.target : '/' 
            app.locals.target = null;
            passport.authenticate('github', {
                successRedirect: redirect,
                failureRedirect: redirect //how to handle failure
            })(req, res);
        });
    
    app.route('/api/polls/')
        .get(function(req,res) {
            //todo: retrieve every user's polls to display on index view
        })
        .post(function(req,res) {
            console.log(req.body);
        });

	// app.route('/api/:id/clicks')
	// 	.get(isLoggedIn, clickHandler.getClicks)
	// 	.post(isLoggedIn, clickHandler.addClick)
	// 	.delete(isLoggedIn, clickHandler.resetClicks);
};