'use strict';

import axios from 'axios';

const requestHelper = {
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
  }
};

export default requestHelper