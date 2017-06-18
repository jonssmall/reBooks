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
      return err;
    });
  },

  getBooks() {    
    return axios.get('/books')
      .then(res => {
        return res
      })
      .catch(err => {        
        return err;
      });
  },

  getBook(id) {
    return axios.get(`/books/${id}`)
      .then(res => {
        return res
      })
      .catch(err => {        
        return err;
      });
  },

  getMyBooks() {    
    return axios.get('/user/books') //is this restful enough?
      .then(res => {
        return res
      })
      .catch(err => {        
        return err;
      });
  },

  deleteBook(id) {    
    return axios.delete(`/books/${id}`)
      .then(res => {
        return res
      })
      .catch(err => {        
        return err;
      });
  }
};

export default bookHelper