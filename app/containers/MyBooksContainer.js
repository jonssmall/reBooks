'use strict';

import React from 'react';
import bookHelper from '../helpers/bookHelpers';

class MyBooksContainer extends React.Component {
  constructor(props) {    
    super(props);
    this.state = {
      myBooks: [],
      newBook: {
        title: '',
        author: ''
      }
    };

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };
  
  componentDidMount() {    
    bookHelper.getMyBooks()
      .then(result => {        
        const books = [];
        result.data.map(b => {
          books.push({ 
            title: b.title,
            author: b.author
          });
        });
        this.setState({ myBooks: books });
      });
  };
  
  handleUpdate(event) {
    const newBook = this.state.newBook;
    newBook[event.target.name] = event.target.value;
    this.setState({ newBook });
  };

  handleSubmit() {
    bookHelper.addBook(this.state.newBook)
      .then(result => {        
        if(result.status == 200) { //tighter way to do this? DRY w/ componentDidMount?
          const books = this.state.myBooks;
          books.push({
            title: result.data.title,
            author: result.data.author
          });
          this.setState({ myBooks: books });
        }
      });    
    const clearBook = {
      title: '',
      author: ''
    };
    this.setState({ newBook: clearBook });
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
        Title:
        <input type="text" name="title" value={props.newBook.title} onChange={props.onUpdate} />
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
  let iterator = 1;
  props.books.map(b => {
    const book = (
      <div key={iterator}>
        <em>{b.title}</em> by {b.author}
      </div>
    );
    iterator++;
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