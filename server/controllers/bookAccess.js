'use strict';

const Books = require('../models/books');

function addBook(req, res) {
  const newBook = new Books();  
  newBook.title = req.body.book.title;
  newBook.author = req.body.book.author;
  newBook.owner = req.user._id;

  newBook.save(err => {
    if (err) throw err;
    res.json(newBook);
  });
};

function getBooks(req, res) {
  Books.find({}, (err, books) => {
    if (err) throw err;
    res.json(books);
  });
};

function getMyBooks(req, res) {
  Books.find({ owner: req.user._id }, (err, books) => {
    if (err) throw err;
    res.json(books);
  });
};

function getBook(req, res) {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    Books
      .findOne({ _id: req.params.id })
      .populate('owner')
      .exec((err, book) => {
        if (err) throw err;
        res.json(book);
      });    
  } else {
    res.status(404).send('Invalid Book ID');
  }
};

function deleteBook(req, res) {
  //todo: ensure deleting requests for book.
  //todo: active trade can't delete book
  //todo: You can only delete your own books.
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    Books.findOne({ _id: req.params.id }).remove(err => {
      if (err) throw err;
      res.status(200).send('Deleted book.');
    });
  } else {
    res.status(404).send('Invalid Book ID');
  }
}

module.exports = {
  addBook,
  getBooks,
  getMyBooks,  
  getBook,
  deleteBook  
};