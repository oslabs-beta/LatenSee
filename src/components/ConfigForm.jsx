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

const ConfigForm = () => {
  const [appName, setAppName] = useInput('');
  const [funcName, setFuncName] = useInput('');
  const [url, setUrl] = useInput('');
  const [invRate, setInvRate] = useInput('');
  const [successMessage, setSuccessMessage] = useState('');

  //on submit, send form data to server
  const handleSubmit = (e) => {
    e.preventDefault();
    //form body to send to server
    const body = {
      appName: appName,
      funcName: funcName,
      funcUrl: url,
      funcFreq: invRate,
      warmerOn: '',
      //stretch: add userId field for auth
    };

    fetch('/api/config/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSuccessMessage('Function successfully added!'); //set success message on successful post
      })
      .catch((err) => {
        console.log(' add func fetch api/config/new: ERROR: ', err);
        setSuccessMessage(''); //reset the success message on error
      });
  };

  return (
    <div className="config-form">
      <form onSubmit={handleSubmit}>
        <label for="appName">App name: </label>
        <input
          placeholder='Enter app name (e.g. "MyApp")'
          type="text"
          id="appName"
          name="appName"
          value={appName}
          onChange={setAppName}
        />
        <label htmlFor="funcname"> Function name: </label>
        <input
          placeholder='Enter function name (e.g. "sendEmail")'
          type="text"
          id="funcname"
          name="funcname"
          value={funcName}
          onChange={setFuncName}
        />
        <br></br>
        <label for="url">Function URL: </label>
        <input
          placeholder="Enter function URL"
          type="text"
          id="url"
          name="url"
          value={url}
          onChange={setUrl}
        />
        <br></br>
        <label for="invRate">Invocation rate: </label>
        <input
          placeholder="Enter as CRON expression (e.g. 0 0 12 * * ?)"
          type="text"
          id="invRate"
          name="invRate"
          value={invRate}
          onChange={setInvRate}
        />
        <br></br>
        <label class="switch">
          Warmer on:
          <input type="checkbox" />
          <span class="slider round"></span>
        </label>
        <br></br>
        <button type="submit">Save</button>
        {successMessage && <span>{successMessage}</span>}
      </form>
    </div>
  );
};

export default ConfigForm;
