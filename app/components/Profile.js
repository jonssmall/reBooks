'use strict';

import React from 'react';

function Profile(props) {
  const output = (
    <div>
      <div>
        <h1>Welcome guy</h1>
        <label>
          Name:
          <input type="text" name="name" value={props.user.name} onChange={props.onUpdate} />
        </label>
        <label>
          City:
          <input type="text" name="city" value={props.user.city} onChange={props.onUpdate} />
        </label>
        <label>
          State:
          <input type="text" name="state" value={props.user.state} onChange={props.onUpdate} />
        </label>
        <button onClick={props.onSubmit}>Update User</button>
      </div>
    </div>
  );
  return output;
};

export default Profile