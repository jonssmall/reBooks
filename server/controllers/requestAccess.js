'use strict';

const Books = require('../models/books');

//My books in which I requested a trade (approved or not)
function getMyRequests(req, res) {  
  const query = { $and: [ { owner: req.user._id }, { trade: { $ne: null } } ] };
  Books.find(query)
  .populate('trade.book')
  .exec((err, books) => {
    if (err) throw err;
    res.json(books);
  });
};

//Everyones books that have trade ID's for books belonging to me
function getOffersForMine(req, res) {
  const query= { owner: { $ne: req.user._id } }
  Books.find(query)
  .populate('trade.book')
  .exec((err, books) => {
    if (err) throw err;    
    res.json(books.filter(b => {
      return b.trade.book && String(b.trade.book.owner) == String(req.user._id);
    }));    
  });
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