'use strict';

import React from 'react';

function Profile(props) {  
  return (
    <form className="pure-form pure-form-stacked">
      <fieldset>
        <legend>User Info</legend>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" placeholder="Name" value={props.user.name} onChange={props.onUpdate} />
        <label htmlFor="city">City</label>
        <input id="city" type="text" placeholder="City" value={props.user.city} onChange={props.onUpdate} />
        <label htmlFor="state">State</label>
        <input id="state" type="text" placeholder="State" value={props.user.state} onChange={props.onUpdate} />
        <button type="submit" className="pure-button pure-button-primary" onClick={props.onSubmit} >Update</button>                              
      </fieldset>            
    </form>
  );
};

export default Profile