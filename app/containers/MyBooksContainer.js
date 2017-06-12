'use strict';

import React from 'react';
import bookHelper from '../helpers/bookHelpers';

class MyBooksContainer extends React.Component {
  constructor(props) {    
    super(props);
    this.state = {
      myBooks: [],
      newBook: {
        name: '',
        author: ''
      }
    };

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };
  
  componentDidMount() {    
    bookHelper.getMyBooks(this.props.user._id);
  };
  
  handleUpdate(event) {
    const newBook = this.state.newBook;
    newBook[event.target.name] = event.target.value;
    this.setState({newBook});
  };

  handleSubmit() {
    console.log(this.state.newBook);
    const clearBook = {
      name: '',
      author: ''
    };
    this.setState({newBook: clearBook});
  };

  render() {       
    return (
      <div>        
        <NewBook newBook={this.state.newBook} onUpdate={this.handleUpdate} onSubmit={this.handleSubmit} />        
        <MyBooks books={this.state.myBooks} />
      </div>
    )
  };
};

function NewBook(props) {  
  return (
    <div>      
      <h1>New Book:</h1>
      <label>
        Name:
        <input type="text" name="name" value={props.newBook.name} onChange={props.onUpdate} />
      </label>
      <label>
        Author:
        <input type="text" name="author" value={props.newBook.author} onChange={props.onUpdate} />
      </label>      
      <button onClick={props.onSubmit}>Create Book</button>      
    </div>
  )
};

function MyBooks(props) {
  const books = [];
  props.books.map(b => {
    const book = (
      <div>
        <em>{b.name}</em> by {b.author}
      </div>
    );
    books.push(book);
  });
  return (    
    <div>
      <h1>My Books:</h1>
      {books}
    </div>
  )
};

export default MyBooksContainer;