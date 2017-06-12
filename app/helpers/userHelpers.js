'use strict';

import axios from 'axios';

function updateUser(user) {
    //PUT to user api to change Name, City, State
    return axios.put('/user', {
      user: user
    })
    .then(res => {      
      return res;
    })
    .catch(err => {
      console.log(err);
    });
}

export default updateUser