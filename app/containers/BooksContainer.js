'use strict';

import React from 'react';
//import Profile from '../components/Profile';
//import updateUser from '../helpers/userHelpers';

class BooksContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {books: []};
  };

  //AJAX to get books from DB and load them into state
  // componentDidMount() {    
  // };
  
  render() {       
    return (
      <div>
        Books
      </div>
    )
  };
};

export default BooksContainer;