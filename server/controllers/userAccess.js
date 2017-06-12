'use strict';

const Users = require('../models/users.js');

const userApi = {
  updateLocation (req, res) {  
    const updateObj = {
      name: req.body.user.name,
      city: req.body.user.city,
      state: req.body.user.state
    };
    console.log(updateObj);
    Users.update({ 'github.username': req.body.user.github.username }, updateObj, (err, raw) => {
      if (err) return handleError(err);
      console.log('User updated. The raw response from Mongo was ', raw);
    });
  }
};

module.exports = userApi;