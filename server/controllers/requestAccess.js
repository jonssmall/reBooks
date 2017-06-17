'use strict';

const Requests = require('../models/requests');

function addRequest (req, res) {  
  const newRequest = new Requests();    
  newRequest.firstBook = req.body.firstBook;
  newRequest.secondBook = req.body.secondBook;
  newRequest.approved = false;
  newRequest.completed = false;

  newRequest.save(err => {
    if (err) throw err;
    res.json(newRequest);
  });
};

module.exports = {
  addRequest: addRequest
};