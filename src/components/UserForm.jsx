import React from 'react';
import { useState, useEffect } from 'react';
import SVGfiles from './SVGfiles';

const UserForm = () => {
  // defining frequencies drop down options 
  const freqOptions = ['10S', '1M', '5M', '15M', '30M', '1H', '2H', '3H']

  // state to hold the list of all functions
  const [data, setData] = useState([]);
  const [apps, setApps] = useState([]);
  const [selectedApp, setSelectedApp] = useState('All');

  // fetch all functions from server on load
  useEffect(() => {
    fetch('/api/user')
      .then((res) => res.json())
      .then((data) => {
        setData(data); // Set the state with the fetched data
        const appNames = ['All', ...new Set(data.map((item) => item.appName))]; // Get all unique app names
        setApps(appNames); // Set the state with the unique app names
      })
      .catch((error) => {
        console.log('Failed to load functions', error);
      });
  }, [data]);

  // On click of 'start/stop', update function's status
  const updateStatus = (funcID, warmerOn) => {
    const newStatus = (warmerOn === 'Yes' ? 'No': 'Yes')
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
    fetch(`/api/config/delete?id=${funcID}`, { method: 'DELETE' })
      .then(() => {
        console.log('Function deleted');
        // remove the function from the state
        const updatedData = data.filter((item) => item.funcID !== funcID);
        setData(updatedData);
      })
      .catch((err) => console.log('Error deleting function: ', err));
  };

  return (
    <div>
      <div className="app-selection">
        <label htmlFor="appSelect">Select App: </label>
        <select
          id="appSelect"
          value= {selectedApp ? selectedApp : 'All'}
          onChange={(e) => setSelectedApp(e.target.value)}
        >
          {apps.map((app) => (
            <option key={app} value={app}>
              {app}
            </option>
          ))}
        </select>
      </div>
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
            {data
            .filter((item) => selectedApp !== 'All' ? item.appName === selectedApp : item.appName !== null)
              .map((item) => (
                <tr key={item.funcId}>
                  <td>{item.funcName}</td>
                  <td>
                    <button onClick={() => updateStatus(item.funcID, item.warmerOn)}>
                      {item.warmerOn === 'Yes' ? SVGfiles.openEyeSVG : SVGfiles.closedEyeSVG}
                    </button>
                  </td>
                  <td>{item.warmerOn === 'Yes' ? 'Running' : 'Stopped'}</td>
                  <td>
                    <select
                      name="funcFreq"
                      id="freq"
                      onChange={(e) =>
                        editFuncFreq(item.funcID, e.target.value)
                      }>
                      <option value={`${item.funcFreq}`}>{item.funcFreq}</option>
                      {freqOptions.map((frequency) => (
                        frequency !== item.funcFreq ? <option value={frequency}>{frequency}</option> : null))
                    }
                    </select>
                  </td>
                  <td>
                    <button onClick={() => deleteFunc(item.funcID)}>
                      {SVGfiles.deleteSVG}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserForm;
