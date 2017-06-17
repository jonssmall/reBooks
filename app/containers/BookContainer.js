'use strict';

import React from 'react';
import bookHelper from '../helpers/bookHelpers';

class BookContainer extends React.Component {
  constructor(props) {    
    super(props);
    this.state = {
      book: {
        id: props.match.params.id
      }
    };
  };  

  getBook(id) {
    bookHelper.getBook(id)
      .then(result => {            
        const book = {
          id: result.data._id,
          title: result.data.title,
          author: result.data.author
        };
        this.setState({ book });
      });
  };

  componentDidMount() {    
    this.getBook(this.state.book.id);
  };
  
  //Reloading component after one lateral move from one book to the other. Is there another way?
  componentWillReceiveProps(newProps) {        
    this.getBook(newProps.match.params.id);
  };
  
  render() {
    //if successful call <book> else "book not found"    
    return (      
      <Book book={this.state.book} />
    )
  };
};

function Book(props) {
  return <h1>{props.book.title} by {props.book.author}</h1>;
};

export default BookContainer;