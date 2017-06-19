'use strict';

const Users = require('../models/users');

function updateLocation (req, res) {  
  const updateObj = {
    name: req.body.user.name,
    city: req.body.user.city,
    state: req.body.user.state
  };
  console.log(updateObj);
  Users.update({ 'github.username': req.body.user.github.username }, updateObj, (err, raw) => {
    if (err) res.status(500).send("Error updating user: ", err);
    console.log('User updated. The raw response from Mongo was ', raw);
    res.status(200).send("Updated user.");
  });
};

module.exports = {
  updateLocation
};