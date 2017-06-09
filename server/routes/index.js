'use strict';

let path = process.cwd();

module.exports = function (app, passport) {

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
					console.log(window.USER);
				</script>
    			<script type="text/javascript" src="/app/index.js" charset="utf-8"></script>
			</body>
			</html>
			`
			res
          	.set('Content-Type', 'text/html')
          	.status(200)
          	.end(html);
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/');
		});    
        
	app.route('/auth/github')
		.get(function(req, res) {
            //forwarding unauthorized user to intended view
            //how to limit this to a single user's auth flow rather than server global?
            if (req.query.target) app.locals.target = req.query.target;            
            passport.authenticate('github')(req, res);
        });                    

    app.route('/auth/github/callback')
		.get(function(req, res, next) {            
            const redirect = app.locals.target ? '/#/' + app.locals.target : '/' 
            app.locals.target = null;
            passport.authenticate('github', {
                successRedirect: redirect,
                failureRedirect: redirect //how to handle failure
            })(req, res, next);
        });    
};