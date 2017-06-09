const axios = require('axios');

function getUser () {    
    return axios.get('/profile')
        .then(response => {
            return response
        }).catch(error => {
            console.log(error);
        });
}

module.exports = {    
    getUser: getUser
};