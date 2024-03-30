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

  //form body to send to server
  const body = {
    appName: appName,
    funcName: funcName,
    funcUrl: url,
    funcFreq: invRate,
    warmerOn:'' 
    //stretch: add userId field for auth
  };

  //on submit, send form data to server
  const handleSubmit = (e) => {
    e.preventDefault();
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
      })
      .catch((err) => console.log(' add func fetch /config: ERROR: ', err));
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
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ConfigForm;
