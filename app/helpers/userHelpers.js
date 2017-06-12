const axios = require('axios');

function updateUser(user) {
    //PUT to user api to change Name, City, State
    axios.put('/user', {
      user: user
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export default updateUser