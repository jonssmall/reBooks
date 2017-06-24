'use strict';

import React from 'react';
import requestHelper from '../helpers/requestHelpers';

class RequestContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requests: [],
      offers: [],
      history: this.props.history
    };    
    this.approveOffer = this.approveOffer.bind(this);
    this.denyOffer = this.denyOffer.bind(this);
    this.completeTrade = this.completeTrade.bind(this);
    this.cancelRequest = this.cancelRequest.bind(this);
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

  approveOffer(offerId) {
    requestHelper.approveRequest(offerId)
      .then(result => {
        if (result.status == 200) {
          const offers = this.state.offers.filter(o => o._id != offerId);
          this.setState({ offers });
          requestHelper.getRequests()
            .then(result => {        
              this.setState({ requests: result.data });
            });
        }        
      });
  };

  denyOffer(offerId) {
    requestHelper.denyRequest(offerId)
      .then(result => {        
        if (result.status == 200) {          
          const offers = this.state.offers.filter(o => o._id != offerId);
          this.setState({ offers });          
        }
      });
  };

  completeTrade(requestId) {
    requestHelper.completeRequest(requestId)
      .then(result => {        
        if (result.status == 200) {
          const requests = this.state.requests.filter(r => r._id != requestId);
          const history = result.data.requestHistory;
          this.setState({ requests, history });
        }
      });
  };

  cancelRequest(requestId) {
    requestHelper.denyRequest(requestId)
      .then(result => {
        if (result.status == 200) {                    
          const requests = this.state.requests.filter(r => r._id != requestId);
          const history = result.data.requestHistory;
          this.setState({ requests, history });      
        }
      });
  };

  render() {       
    return (
      <div>
        <h1>Requests:</h1>
        <Requests requests={this.state.requests} completeHandler={this.completeTrade} cancelHandler={this.cancelRequest} />
        <Offers offers={this.state.offers} approveHandler={this.approveOffer} denyHandler={this.denyOffer} />
        <History history={this.state.history} />
      </div>
    )
  };
};

function Requests(props) {
  const list = [];  
  props.requests.map(r => {
    const pending = <span>Pending <button onClick={props.cancelHandler.bind(this, r._id)} >Cancel</button></span>;
    const approved = <span>Approved <button onClick={props.completeHandler.bind(this, r._id)} >Complete</button></span>;
    list.push(
      <div key={r._id} >
        My <em>{r.title}</em> for <em>{r.trade.book.title}</em>. Status: {r.trade.approved ? approved : pending }
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
        <button onClick={props.approveHandler.bind(this, o._id)} >Approve</button>
        <button onClick={props.denyHandler.bind(this, o._id)} >Deny</button>
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

function History(props) {  
  const list = [];
  props.history.map(h => {
    list.push(
      <div key={h._id} >
        My <em>{h.myBook}</em> for <em>{h.otherBook}</em> - Outcome: {h.outcome}        
      </div>
    );
  });
  return (
    <div>
      <h3>History of trades:</h3>
      {list}
    </div>
  )
};

export default RequestContainer;