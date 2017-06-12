'use strict';

import axios from 'axios';

const bookHelper = {
  addBook(bookObj) {
    //axios.post a new book
  },

  getAllBooks() {
    //axios.get(/books)
  },

  getBook(id) {
    //axios.get(/books/:id)
  },

  getMyBooks(userId) {
    //axios.get(user/books)
    console.log(userId);
  },

  deleteBook(id) {
    //axios.delete(/books/:id)
  }
};

export default bookHelper