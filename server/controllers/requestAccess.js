'use strict';

const Books = require('../models/books');
const Users = require('../models/users');

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
      return !b.trade.approved && b.trade.book && String(b.trade.book.owner) == String(req.user._id);
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

// set offered book's trade property to null.
// stuff receipt into User model.
function denyRequest(req, res) {
  const update = { trade : null };
  Books.findById(req.params.id)
  .populate('trade.book')
  .exec((err, book) => {
    if (err) throw err;
    const receipt = {
      myBook: book.title, 
		  otherBook: book.trade.book.title, 
		  outcome: "Rejected"
    };
    book.trade = null;        
    book.save((err, book) => {
      if (err) throw err;
      const addReceipt = { $push: { requestHistory: receipt } };
      Users.findByIdAndUpdate(book.owner, addReceipt, {new: true}, (err, user) => {
        if (err) throw err;        
        res.json(user);
      });
    });  
  });
};

// Set 2 books trade properties to null,
// push receipt into each owner's requestHistory 
function completeRequest(req, res) {
  Books.findById(req.params.id)
  .populate('trade.book')
  .exec((err, book) => {
    if (err) throw err;
    const receipt = {
      myBook: book.title, 
		  otherBook: book.trade.book.title, 
		  outcome: "Completed"
    };
    const otherBookId = book.trade.book._id;
    const otherUserId = book.trade.book.owner;
    const otherReceipt = {
      myBook: book.trade.book.title, 
		  otherBook: book.title, 
		  outcome: "Completed"
    }
    book.trade = null;        
    book.save((err, book) => {
      if (err) throw err;
      const addReceipt = { $push: { requestHistory: receipt } };
      Users.findByIdAndUpdate(book.owner, addReceipt, {new: true}, (err, user) => {
        if (err) throw err;
        Books.findByIdAndUpdate(otherBookId, { trade: null }, (err, otherBook) => {
          if (err) throw err;
          const addOtherReceipt = { $push: { requestHistory: otherReceipt } };
          Users.findByIdAndUpdate(otherUserId, addOtherReceipt, (err, otherUser) => {
            if (err) throw err;
            res.json(user);
          }); //The pyramid of death. Better option than callback hell for mongo?
        });
      });
    });  
  });
};

//  update offered book's trade property,
//    include reciprocation for requested book,
//    and destroy all other offers for said book.
function approveRequest(req, res) {
  const update = { 'trade.approved' : true };
  Books.findByIdAndUpdate(req.params.id, update, (err, book) => {
    if (err) throw err;
    const reciprocal = { trade: { approved: true, book: book._id } };
    Books.findByIdAndUpdate(book.trade.book, reciprocal, (err, secondBook) => {
      if (err) throw err;            
      const otherPendingQuery = { $and: [ {'trade.book' : secondBook._id }, { 'trade.approved' : false } ] };
      const clearTrade = { trade : null };            
      Books.update(otherPendingQuery, clearTrade, {multi: true}, (err, raw) => {      
        if (err) throw err;        
        res.json(secondBook);
      });
    });    
  });  
};

module.exports = {
  getMyRequests,
  getOffersForMine,
  addRequest,
  denyRequest,
  approveRequest,
  completeRequest
};