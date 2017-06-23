'use strict';

const Books = require('../models/books');

function getMyRequests(req, res) {  
  const query = { $and: [ { owner: req.user._id }, { trade: { $ne: null } } ] };
  Books.find(query)
  .populate('trade.book')
  .exec((err, books) => {
    if (err) throw err;
    res.json(books);
  });

};

function getOffersForMine(req, res) {
  console.log(req);
  res.send("OK");
};

function addRequest(req, res) {
  const update = { trade: { book: req.body.requestId, approved: false } };
  Books.findByIdAndUpdate(req.body.offerId, update, (err, book) => {
    if (err) throw err;
    res.json(book);
  });
};

function denyRequest(req, res) {
  console.log(req);
  res.send("OK");
};

function approveRequest(req, res) {
  console.log(req);
  res.send("OK");
};

module.exports = {
  getMyRequests,
  getOffersForMine,
  addRequest,
  denyRequest,
  approveRequest
};