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
    this.handleDelete = this.handleDelete.bind(this);
  };
  
  componentDidMount() {    
    bookHelper.getMyBooks()
      .then(result => {            
        const books = [];
        result.data.map(b => {          
          books.push({ 
            title: b.title,
            author: b.author,
            trade: b.trade,
            id: b._id
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
            author: result.data.author,
            id: result.data._id
          });
          this.setState({ myBooks: books });
        } else {
          console.log(result);
        }
      });    
    const clearBook = {
      title: '',
      author: ''
    };
    this.setState({ newBook: clearBook });
  };

  handleDelete(id) {
    bookHelper.deleteBook(id)
      .then(result => {
        if(result.status == 200) {
          let books = this.state.myBooks;
          books = books.filter(b => {
            return b.id !== id
          });
          this.setState({ myBooks: books })
        } else {
          console.log(result);
        }
      });
  }

  render() {       
    return (
      <div>        
        <NewBook newBook={this.state.newBook} onUpdate={this.handleUpdate} onSubmit={this.handleSubmit} />        
        <MyBooks books={this.state.myBooks} onDelete={this.handleDelete} />
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
  props.books.map(b => {    
    const deleteButton = <button onClick={props.onDelete.bind(this, b.id)}>Delete</button>;
    const disabledButton = <button disabled={true} >In Use</button>;
    const book = (
      <div key={b.id}>
        <em>{b.title}</em> by {b.author}
        {b.trade ? disabledButton : deleteButton }
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