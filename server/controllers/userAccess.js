'use strict';

const Users = require('../models/users.js');

function updateLocation (req, res) {
  const updateObj = {
    name: req.body.name,
    city: req.body.city,
    state: req.body.state
  };
  Users.update({ "github.username": req.body.username }, updateObj, (err, raw) => {
    if (err) return handleError(err);
    console.log(`User updated. The raw response from Mongo was ${raw}`);
  });
}

module.exports = {
  updateLocation: updateLocation
};