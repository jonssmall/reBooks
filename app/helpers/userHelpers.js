'use strict';

import axios from 'axios';

function updateUser(user) {
    //PUT to user api to change Name, City, State
    axios.put('/user', {
      user: user
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
}

export default updateUser