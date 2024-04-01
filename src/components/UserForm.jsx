import React from 'react';
import { useState, useEffect } from 'react';

const UserForm = () => {
  // state to hold the list of all functions
  const [data, setData] = useState([]);

  // fetch all functions from server on load
  useEffect(() => {
    fetch('/api/config/all')
      .then((data) => data.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log('Failed to load functions', error);
      });
  }, []);

  // On click of start/stop, update function's status
  const updateStatus = (funcID, newStatus) => {
    const updatedData = data.map((item) => {
      // find the function that matches the id and update its status
      if (item.funcID === funcID) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    setData(updatedData);

    // form updated status body to send to server
    const body = {
      funcID: funcID,
      status: newStatus,
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

  //on click of edit, send updated function freq to server

  //On click of delete, delete function from server
  // const deleteFunc = () => {
  //   fetch('/api/config/delete', { method: 'DELETE' })
  //     .then(() => {
  //       setFunctions(functions.filter((func) => func.func.id !== functionId));
  //     })
  //     .catch((err) => console.log('Error deleting function: ', err));
  // };

  return (
    <div className="user-table">
      <table>
        <thead>
          <tr>
            <th>Function name</th>
            <th>Start</th>
            <th>Stop</th>
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
                <button onClick={() => updateStatus(item.funcID, 'Running')}>
                  start button
                </button>
              </td>
              <td>
                <button onClick={() => updateStatus(item.funcID, 'Stopped')}>
                  stop button
                </button>
              </td>
              <td>{item.status}</td>
              <td>
                <button>edit button</button>
              </td>
              <td>
                <button onClick={() => deleteFunc(func.id)}>
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
