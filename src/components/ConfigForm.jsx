import React from 'react';
import { useState } from 'react';

const useInput = (init) => {
  const [value, setValue] = useState(init);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return [value, onChange];
};

const ConfigForm = () => {
  const [funcName, setFuncName] = useInput('');
  const [url, setUrl] = useInput('');

  const body = {
    funcName: funcName,
    url: url,
    //possibly add userId field for auth
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/config', {
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
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="funcname">Name of function: </label>
        <input
          type="text"
          id="funcname"
          name="funcname"
          value={funcName}
          onChange={setFuncName}
        />
        <label for="url">URL: </label>
        <input type="text" id="url" name="url" value={url} onChange={setUrl} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ConfigForm;
