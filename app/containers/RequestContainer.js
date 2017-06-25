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
          requestHelper.getOffers()
            .then(result => {        
              this.setState({ offers: result.data });
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
  let count = 1;
  props.requests.map(r => {
    const pending = <button onClick={props.cancelHandler.bind(this, r._id)} >Cancel</button>
    const approved = <button onClick={props.completeHandler.bind(this, r._id)} >Complete</button>
    const status = r.trade.approved ? 'Approved' : 'Pending';
    const action = r.trade.approved ? approved : pending;
    //r.trade.approved
    list.push(      
      <tr key={r._id} className={count % 2 == 1 ? "pure-table-odd" : ""} >
        <td>{count}</td>    
        <td>{r.title}</td>
        <td>{r.trade.book.title}</td>
        <td>{status}</td>
        <td>{action}</td>                  
      </tr>
    );
    count++;
  });
  return (
    <div>
      <h3>Trade requests I have made for others' books:</h3>
      <table className="pure-table">
        <thead>
          <th>#</th>
          <th>My Book</th>
          <th>Request</th>
          <th>Status</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {list}
        </tbody>
      </table>
    </div>
  )
};

function Offers(props) {
  const list = [];
  let count = 1;    
  props.offers.map(o => {
    list.push(      
      <tr key={o._id} className={count % 2 == 1 ? "pure-table-odd" : ""} >
        <td>{count}</td>    
        <td>{o.title}</td>
        <td>{o.trade.book.title}</td>
        <td>
          <button onClick={props.approveHandler.bind(this, o._id)} >Approve</button>&nbsp;
          <button onClick={props.denyHandler.bind(this, o._id)} >Deny</button>
        </td>
      </tr>
    );
    count++;
  });
  return (
    <div>
      <h3>Offers others have made for my books:</h3>      
      <table className="pure-table">
        <thead>
          <th>#</th>
          <th>Offer</th>
          <th>My Book</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {list}
        </tbody>
      </table>
    </div>
  )
};

function History(props) {  
  const list = [];
  let count= 1;
  props.history.map(h => {
    list.push(
      <tr key={h._id} className={count % 2 == 1 ? "pure-table-odd" : ""} >
        <td>{count}</td>    
        <td>{h.myBook}</td>
        <td>{h.otherBook}</td>
        <td>{h.outcome}</td>
      </tr>
    );
    count++;
  });
  return (
    <div>
      <h3>History of trades:</h3>      
      <table className="pure-table">
        <thead>
          <th>#</th>
          <th>My Book</th>
          <th>Request</th>
          <th>Outcome</th>
        </thead>
        <tbody>
          {list}
        </tbody>
      </table>

    </div>
  )
};

export default RequestContainer;