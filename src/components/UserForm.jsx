import React from 'react';
import { useState, useEffect } from 'react';

const UserForm = () => {
  // state to hold the list of all functions
  const [data, setData] = useState([]);

  // fetch all functions from server on load
  useEffect(() => {
    fetch('/api/user')
      .then((data) => data.json())
      .then((data) => {
        setData(data); // Set the state with the fetched data
      })
      .catch((error) => {
        console.log('Failed to load functions', error);
      });
  }, []); 

  // On click of 'start/stop', update function's status
  const updateStatus = (funcID, warmerOn) => {
    // TO DELETE NOTE : updated here to make this faster because it was sticking
    const newStatus = data.find((item) => item.funcID === funcID).status === 'Yes'
          ? 'No'
          : 'Yes';
    const updatedData = data.map((item) => {
      // find the function that matches the id and update its status (for immediate UI feedback in status column)
      if (item.funcID === funcID) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    setData(updatedData); // Update the state with the new status
    // form updated status body to send to server
    const body = {
      funcID: funcID,
      warmerOn: newStatus,
    };
    // send updated status to server
    fetch('/api/config', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log('Error updating function status: ', err));
  };

  // On change of 'edit freq', send updated function freq to server
  const editFuncFreq = (funcID, newFreq) => {
    // form updated frequency body to send to server
    const body = {
      funcID: funcID,
      funcFreq: newFreq,
    };
    // send updated frequency to server
    fetch('/api/config', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Function frequency updated: ', data);
      })
      .catch((err) => console.log('Error updating function status: ', err));
  };

  // On click of 'delete', delete function from server
  const deleteFunc = (funcID) => {
    /* TO DELETE NOTE : updated here because it was not deleting from the csv file,
     the way that the delete route works is that it uses query params to specify which 
     function id to delete so I added that here
    */
    fetch(`/api/config/delete?id=${funcID}`, { method: 'DELETE' })
      .then(() => {
        console.log('Function deleted');
        // remove the function from the state
        const updatedData = data.filter((item) => item.funcID !== funcID);
        setData(updatedData);
      })
      .catch((err) => console.log('Error deleting function: ', err));
  };

  /* TO DELETE NOTE : updated option values in the drop down to match the csv file (10S, 1M etc). 
    */
  return (
    <div className="user-table">
      <table>
        <thead>
          <tr>
            <th>Function name</th>
            <th>Start/Stop</th>
            <th>Status</th>
            <th>Edit Frequency</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.funcId}>
              <td>{item.funcName}</td>
              <td>
                <button onClick={() => updateStatus(item.funcID)}>
                  {item.status === 'Yes' ? 'Stop' : 'Start'} 
                </button>
              </td>
              <td>{item.status === 'Yes' ? 'Running' : 'Stopped'}</td>
              <td>
                <select
                  name="funcFreq"
                  id="freq"
                  onChange={(e) => editFuncFreq(item.funcID, e.target.value)}
                >
                  <option value="10S">10S</option>
                  <option value="1M">1M</option>
                  <option value="5M">5M</option>
                  <option value="15M">15M</option>
                  <option value="30M">30M</option>
                  <option value="1H">1H</option>
                  <option value="2H">2H</option>
                  <option value="3H">3H</option>
                </select>
              </td>
              <td>
                <button onClick={() => deleteFunc(item.funcID)}>
                  delete button
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserForm;
