import React from 'react';
import { useState } from 'react';

//to take in user input & set values on change
const useInput = (init) => {
  const [value, setValue] = useState(init);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return [value, onChange];
};

const UserForm = () => {
  return (
    <div className="user-table">
      <table>
        <tr>
          <th>Function name</th>
          <th>Start</th>
          <th>Stop</th>
          <th>Status</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        <tr>
          <td>signInFunc</td>
          <td>start button</td>
          <td>stop button</td>
          <td>Running/Stopped</td>
          <td>edit button</td>
          <td>delete button</td>
        </tr>
      </table>
    </div>
  );
};

export default UserForm;
