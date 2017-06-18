'use strict';

import React from 'react';
import bookHelper from '../helpers/bookHelpers';
import requestHelper from '../helpers/requestHelpers';

class RequestContainer extends React.Component {
  constructor(props) {
    super(props);     
    this.state = {
      requestedBook: props.location.state.book,
      offeredBook: {}
    };    
  };  
  
  componentDidMount() {
    //this.getBook(this.state.book.id);
  };

  render() {    
    return (
      <div>Requested book: {this.state.requestedBook.title}</div>
    )
  };
};

export default RequestContainer;