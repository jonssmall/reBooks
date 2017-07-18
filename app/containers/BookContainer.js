'use strict';

import React from 'react';
import {Link, Switch, Route} from 'react-router-dom';
import bookHelper from '../helpers/bookHelpers';
import requestHelper from '../helpers/requestHelpers';

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

    this.getOfferBooks = this.getOfferBooks.bind(this);
    this.submitRequest = this.submitRequest.bind(this);
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
  getOfferBooks() {
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

  submitRequest(offerId) { //save offered book's 'trade' nested property with ID of requested book
    requestHelper.submitRequest(this.state.book.id, offerId)
      .then(result => {
        console.log(result);  
        if(result.status == 200) {
          const myAvailableBooks = this.state.myAvailableBooks.filter(b => {
            return b.id != offerId;
          });          
          this.setState({ myAvailableBooks });
        }
      });
  };

  componentDidMount() {
    this.getBook(this.state.book.id);
  };
  
  //Reloading component after one lateral move from one book to the other. Is there another way?
  componentWillReceiveProps(newProps) {
    this.setState({ myAvailableBooks: [] });
    this.getBook(newProps.match.params.id);
  };
  
  render() {
    const tradeableBooks = [];
    this.state.myAvailableBooks.map(b => {
      b.submitHandler = this.submitRequest;
      tradeableBooks.push(
        <TradeableBook key={b.id} {...b} />
      )
    });
    return (
      <div>
        <Book book={this.state.book} clickHandler={this.getOfferBooks} />
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
      {props.title} <button onClick={props.submitHandler.bind(this, props.id)} >Offer This Book</button>
    </div>
  )
};

export default BookContainer;