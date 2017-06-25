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
  const list = [];
  let count = 1;
  props.books.map(b => {
    const buttonAttrs = {
      className:"pure-button pure-button-primary",
      disabled: Boolean(b.trade),
      onClick: props.onDelete.bind(this, b.id)
    };
    const deleteButton = <button {...buttonAttrs} >Delete</button>;    
    const status = b.trade ? 'In use' : 'Available';    
    // b.trade ?
    list.push(      
      <tr key={b.id} className={count % 2 == 1 ? "pure-table-odd" : ""} >
        <td>{count}</td>    
        <td>{b.title}</td>
        <td>{b.author}</td>
        <td>{status}</td>
        <td>{deleteButton}</td>                  
      </tr>
    );
    count++;    
  });
  return (    
    <div>
      <h1>My Books:</h1>      
      <table className="pure-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Book</th>
            <th>Author</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list}
        </tbody>
      </table>
    </div>
  )
};

export default MyBooksContainer;