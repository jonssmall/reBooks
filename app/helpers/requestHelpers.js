'use strict';

import axios from 'axios';

const requestHelper = {
  //my offers for others' books
  // all my books that have assigned .trade properties
  getRequests() {
    return axios.get('/requests/mine')
    .then(res => {
      return res;
    })
    .catch(err => {
      return err
    });
  },

  //the books others have offered for mine
  getOffers() {
    return axios.get('/requests/formine')
    .then(res => {
      return res;
    })
    .catch(err => {
      return err
    });
  },

  submitRequest(requestId, offerId) {
    return axios.post('/requests', {
      requestId,
      offerId
    })
    .then(res => {      
      return res;
    })
    .catch(err => {      
      return err;
    });
  },

  //takes in the ID of the book offered for mine
  approveRequest(offerId) {
    axios.put(`/requests/${offerId}`)
    .then(res => {
      return res;
    })
    .catch(err => {
      return err
    });
  },

  //can this also be used to cancel requests you made?
  denyRequest(offerId) {
    axios.delete(`/requests/${offerId}`)
    .then(res => {
      return res;
    })
    .catch(err => {
      return err
    });
  }

};

export default requestHelper