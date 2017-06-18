'use strict';

import React from 'react';
import {Link, Route} from 'react-router-dom';
import bookHelper from '../helpers/bookHelpers';

class BookContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {
        id: props.match.params.id,
        owner: { //placeholder because render is called before ajax
          _id: null
        } 
      },
      myAvailableBooks:[]
    };

    this.startRequest = this.startRequest.bind(this);
  };  

  getBook(id) {
    bookHelper.getBook(id)
      .then(result => {                
        const book = {
          id: result.data._id,
          title: result.data.title,
          author: result.data.author,
          owner: result.data.owner,
          isAvailable: !(result.data.trade && result.data.trade.approved) //trades that are only proposed don't block other proposals.
        };
        this.setState({ book });
      });
  };

  //Find all my books that aren't already in any trade state (proposed or approved)  
  startRequest() {
    bookHelper.getMyBooks()
      .then(result => {
        if(result.data) {
          const books = [];
          result.data.map(b => {
            if (!b.trade) books.push({ 
              title: b.title,
              author: b.author,
              id: b._id
            });
          });
          this.setState({ myAvailableBooks: books });
        }
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
  let availableCondition;        
  if(!window.USER) {
    availableCondition = "Login to request trades.";
  } else if (props.book.owner._id == window.USER._id) {
    availableCondition = "This is your book.";
  } else if(props.book.isAvailable) {
    availableCondition = <button onClick={props.clickHandler} >Request Trade</button>;
  } else {
    availableCondition = "Book unavailable.";
  }  
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