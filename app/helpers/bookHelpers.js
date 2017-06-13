'use strict';

import axios from 'axios';

const bookHelper = {
  addBook(bookObj) {
    return axios.post('/books', {
      book: bookObj      
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  },

  getAllBooks() {
    //axios.get(/books)
  },

  getBook(id) {
    //axios.get(/books/:id)
  },

  getMyBooks() {    
    return axios.get('/user/books') //is this restful enough?
      .then(res => {
        return res
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  },

  deleteBook(id) {
    //axios.delete(/books/:id)
  }
};

export default bookHelper