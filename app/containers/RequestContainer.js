'use strict';

import React from 'react';
import requestHelper from '../helpers/requestHelpers';

class RequestContainer extends React.Component {
  constructor(props) {
    super(props);    

    //this.handleSubmit = this.handleSubmit.bind(this);
  };

  componentDidMount() {    
    requestHelper.getRequests()
      .then(result => {
        console.log(result);
      });
  };

  render() {       
    return (
      <div>
        <h1>Requests:</h1>
      </div>
    )
  };
};

export default RequestContainer;