'use strict';

import axios from 'axios';

const bookHelper = {
  addBook(bookObj, userId) {
    return axios.post('/books', {
      book: bookObj,
      userId: userId
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });
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