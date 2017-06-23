'use strict';

import React from 'react';
import requestHelper from '../helpers/requestHelpers';

class RequestContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requests: [],
      offers: []
    };
    //this.handleSubmit = this.handleSubmit.bind(this);
  };

  componentDidMount() {
    // PromiseAll?
    requestHelper.getRequests()
      .then(result => {        
        this.setState({ requests: result.data });
      });
    requestHelper.getOffers()
      .then(result => {        
        this.setState({ offers: result.data });
      });
  };

  render() {       
    return (
      <div>
        <h1>Requests:</h1>
        <Requests requests={this.state.requests} />
        <Offers offers={this.state.offers} />
      </div>
    )
  };
};

function Requests(props) {
  const list = [];
  props.requests.map(r => {
    list.push(
      <div key={r._id} >
        My <em>{r.title}</em> for <em>{r.trade.book.title}</em>.
      </div>
    );
  });
  return (
    <div>
      <h3>Trade requests I have made for others' books:</h3>
      {list}
    </div>
  )
};

function Offers(props) {
  const list = [];
  props.offers.map(o => {
    list.push(
      <div key={o._id} >
        <em>{o.title}</em> for my <em>{o.trade.book.title}</em>.
      </div>
    );
  });
  return (
    <div>
      <h3>Offers others have made for my books:</h3>
      {list}
    </div>
  )
};

export default RequestContainer;