import React from 'react';
import { useState, useEffect } from 'react';

const UserForm = () => {
  const openEyeSVG = (
    <svg
      width="29px"
      height="29px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0" />

      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <g id="SVGRepo_iconCarrier">
        {' '}
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M22 12.0002C20.2531 15.5764 15.8775 19 11.9998 19C8.12201 19 3.74646 15.5764 2 11.9998"
          stroke="#11053b"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />{' '}
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M22 12.0002C20.2531 8.42398 15.8782 5 12.0005 5C8.1227 5 3.74646 8.42314 2 11.9998"
          stroke="#11053b"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />{' '}
        <path
          d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
          stroke="#11053b"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />{' '}
      </g>
    </svg>
  );

  const closedEyeSVG = (
    <svg
      width="29px"
      height="29px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0" />

      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <g id="SVGRepo_iconCarrier">
        {' '}
        <path
          d="M21.0006 12.0007C19.2536 15.5766 15.8779 18 12 18M12 18C8.12204 18 4.7463 15.5766 2.99977 12.0002M12 18L12 21M19.4218 14.4218L21.4999 16.5M16.2304 16.9687L17.5 19.5M4.57812 14.4218L2.5 16.5M7.76953 16.9687L6.5 19.5"
          stroke="#11053b"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />{' '}
      </g>
    </svg>
  );

  const deleteSVG = (
    <svg
      width="25px"
      height="25px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0" />

      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <g id="SVGRepo_iconCarrier">
        {' '}
        <path
          d="M12 2.75C11.0215 2.75 10.1871 3.37503 9.87787 4.24993C9.73983 4.64047 9.31134 4.84517 8.9208 4.70713C8.53026 4.56909 8.32557 4.1406 8.46361 3.75007C8.97804 2.29459 10.3661 1.25 12 1.25C13.634 1.25 15.022 2.29459 15.5365 3.75007C15.6745 4.1406 15.4698 4.56909 15.0793 4.70713C14.6887 4.84517 14.2602 4.64047 14.1222 4.24993C13.813 3.37503 12.9785 2.75 12 2.75Z"
          fill="#1C274C"
        />{' '}
        <path
          d="M2.75 6C2.75 5.58579 3.08579 5.25 3.5 5.25H20.5001C20.9143 5.25 21.2501 5.58579 21.2501 6C21.2501 6.41421 20.9143 6.75 20.5001 6.75H3.5C3.08579 6.75 2.75 6.41421 2.75 6Z"
          fill="#1C274C"
        />{' '}
        <path
          d="M5.91508 8.45011C5.88753 8.03681 5.53015 7.72411 5.11686 7.75166C4.70356 7.77921 4.39085 8.13659 4.41841 8.54989L4.88186 15.5016C4.96735 16.7844 5.03641 17.8205 5.19838 18.6336C5.36678 19.4789 5.6532 20.185 6.2448 20.7384C6.83639 21.2919 7.55994 21.5307 8.41459 21.6425C9.23663 21.75 10.2751 21.75 11.5607 21.75H12.4395C13.7251 21.75 14.7635 21.75 15.5856 21.6425C16.4402 21.5307 17.1638 21.2919 17.7554 20.7384C18.347 20.185 18.6334 19.4789 18.8018 18.6336C18.9637 17.8205 19.0328 16.7844 19.1183 15.5016L19.5818 8.54989C19.6093 8.13659 19.2966 7.77921 18.8833 7.75166C18.47 7.72411 18.1126 8.03681 18.0851 8.45011L17.6251 15.3492C17.5353 16.6971 17.4712 17.6349 17.3307 18.3405C17.1943 19.025 17.004 19.3873 16.7306 19.6431C16.4572 19.8988 16.083 20.0647 15.391 20.1552C14.6776 20.2485 13.7376 20.25 12.3868 20.25H11.6134C10.2626 20.25 9.32255 20.2485 8.60915 20.1552C7.91715 20.0647 7.54299 19.8988 7.26957 19.6431C6.99616 19.3873 6.80583 19.025 6.66948 18.3405C6.52891 17.6349 6.46488 16.6971 6.37503 15.3492L5.91508 8.45011Z"
          fill="#1C274C"
        />{' '}
        <path
          d="M9.42546 10.2537C9.83762 10.2125 10.2051 10.5132 10.2464 10.9254L10.7464 15.9254C10.7876 16.3375 10.4869 16.7051 10.0747 16.7463C9.66256 16.7875 9.29502 16.4868 9.25381 16.0746L8.75381 11.0746C8.71259 10.6625 9.0133 10.2949 9.42546 10.2537Z"
          fill="#1C274C"
        />{' '}
        <path
          d="M15.2464 11.0746C15.2876 10.6625 14.9869 10.2949 14.5747 10.2537C14.1626 10.2125 13.795 10.5132 13.7538 10.9254L13.2538 15.9254C13.2126 16.3375 13.5133 16.7051 13.9255 16.7463C14.3376 16.7875 14.7051 16.4868 14.7464 16.0746L15.2464 11.0746Z"
          fill="#1C274C"
        />{' '}
      </g>
    </svg>
  );

  // state to hold the list of all functions
  const [data, setData] = useState([]);
  // const [apps, setApps] = useState([]);
  // const [selectedApp, setSelectedApp] = useState('');

  // fetch all functions from server on load
  useEffect(() => {
    fetch('/api/user')
      .then((res) => res.json())
      .then((data) => {
        setData(data); // Set the state with the fetched data
        // const appNames = [...new Set(data.map((item) => item.appName))]; // Get all unique app names
        // setApps(appNames); // Set the state with the unique app names
        // if (appNames.length > 0) {
        //   setSelectedApp(appNames[0]);
        // }
      })
      .catch((error) => {
        console.log('Failed to load functions', error);
      });
  }, [data]);

  // On click of 'start/stop', update function's status
  const updateStatus = (funcID, warmerOn) => {
    const newStatus = (warmerOn === 'Yes' ? 'No': 'Yes')
      // data.find((item) => item.funcID === funcID).status === 'Yes'
      //   ? 'No'
      //   : 'Yes';
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
      {/* <div className="app-selection">
        <label htmlFor="appSelect">Select App: </label>
        <select
          id="appSelect"
          value={selectedApp}
          onChange={(e) => setSelectedApp(e.target.value)}
        >
          {apps.map((app) => (
            <option key={app} value={app}>
              {app}
            </option>
          ))}
        </select>
      </div> */}
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
              // .filter((item) => item.appName === selectedApp)
              .map((item) => (
                <tr key={item.funcId}>
                  <td>{item.funcName}</td>
                  <td>
                    <button onClick={() => updateStatus(item.funcID, item.warmerOn)}>
                      {item.warmerOn === 'Yes' ? openEyeSVG : closedEyeSVG}
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
                      <option value={`${item.funcFreq}`} selected>{item.funcFreq}
                      </option>
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
                      {deleteSVG}
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
