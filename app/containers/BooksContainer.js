'use strict';

import React from 'react';
import bookHelper from '../helpers/bookHelpers';
import {Link, Route} from 'react-router-dom';

class BooksContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {books: []};
  };

  componentDidMount() {    
    bookHelper.getBooks()
      .then(result => {            
        const books = [];
        result.data.map(b => {
          books.push({ 
            title: b.title,
            author: b.author,
            id: b._id
          });
        });
        this.setState({ books });
      });
  };
  
  render() {     
    return (
      <BooksList books={this.state.books} />
    )
  };
};

//TODO: Abstract out to share with MyBooks component. Might have to compose delete vs. new request.
function BooksList(props) {
  const books = [];
  props.books.map(b => {
    const bookProps = {
      id: b.id,
      title: b.title,
      author: b.author
    };
    books.push(<Book key={b.id} {...bookProps} />);
  });
  return (
    <div>
      {books}
    </div>
    //How about a "no books yet" message
  )
};

function Book(props) {  
  return (
    <div>
      <Link to={`/books/${props.id}`} ><em>{props.title}</em> by {props.author}</Link>
    </div>
  )
};

export default BooksContainer;