'use strict';

const Books = require('../models/books');

function addRequest(req, res) {
  const update = { trade: { book: req.body.requestId, approved: false } };
  Books.findByIdAndUpdate(req.body.offerId, update, (err, book) => {
    if (err) throw err;
    res.json(book);
  });
};

module.exports = {
  addRequest
};