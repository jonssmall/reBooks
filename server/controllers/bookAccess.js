'use strict';

const Books = require('../models/books.js');

function addBook (req, res) {            
    const newBook = new Books();
    newBook.title = req.body.title;
    newBook.author = req.body.author;
    newBook.author = req.body.userId;    

    newBook.save(err => {
      if (err) throw err;
      res.json(newBook);
    });
};

function getBooks (req, res) {        
    Books.find({}, function(err, books) {
        if (err) throw err;        
        res.json(books);
    });
};

function getBook (req, res) {
    if(req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        Books.findOne({_id: req.params.id}, function (err, book) {
            if (err) throw err;                    
            res.json(book);
        });
    } else {
        res.status(404).send('Invalid Book ID');
    }
};

function deleteBook (req, res) {
    if(req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        Books.findOne({_id: req.params.id}).remove(res => {
          res.status(200).send('Deleted book.');
        });
    } else {
        res.status(404).send('Invalid Book ID');
    }
}

module.exports = {
    addBook: addBook,
    getBooks: getBooks,
    getBook: getBook,
    deleteBook: deleteBook
};