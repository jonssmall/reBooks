'use strict';

import React from 'react';
import {Link, Route} from 'react-router-dom';
import bookHelper from '../helpers/bookHelpers';

class BookContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {
        id: props.match.params.id
      },
      myAvailableBooks:[]
    };

    this.startRequest = this.startRequest.bind(this);
  };  

  getBook(id) {
    bookHelper.getBook(id)
      .then(result => {        
        // const available = result.data.owner.requests.some(r => {
        //   //compare Request model's book ID to the current book ID
        // });
        const book = {
          id: result.data._id,
          title: result.data.title,
          author: result.data.author,
          isAvailable: true
        };
        this.setState({ book });
      });
  };

  //Find all my books that aren't already in use.
  startRequest() {
    bookHelper.getTradeableBooks()
      .then(result => {            
        const books = [];
        result.data.map(b => {
          books.push({ 
            title: b.title,
            author: b.author,
            id: b._id
          });
        });
        this.setState({ myAvailableBooks: books });        
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
    const tradeableBooks = [];
    this.state.myAvailableBooks.map(b => {
      tradeableBooks.push(        
        <TradeableBook key={b.id} {...b} />
      )
    });
    return (
      <div>
        <Book book={this.state.book} clickHandler={this.startRequest} />
        {tradeableBooks}
      </div>
    )
  };
};

function Book(props) {
  const availableCondition = props.book.isAvailable ? 
    <button onClick={props.clickHandler} >Request Trade</button>
    : "Book unavailable.";
  return (
    <div>
      <h1>{props.book.title} by {props.book.author}</h1>
      {availableCondition}
    </div>
  )
};

function TradeableBook(props) {
  return (
    <div>
      {props.title}
    </div>
  )
};

export default BookContainer;