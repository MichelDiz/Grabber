import React, { useState, useEffect } from "react";
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import { useForm } from "react-hook-form";
import { Button,Container } from '@material-ui/core';

const onSubmit  = async (response) => 
  await fetch('http://localhost:8008/addconfigs', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({response})
  });

const regenConfigs = async () => await fetch('http://localhost:8008/autosetup', { method: 'GET' });

function App() {

    const { register, handleSubmit } = useForm();
    const [data, setData] = useState({});
  
    useEffect(() => {
      function handleErrors(res) {
        if (!res.ok) {
          console.error("Got an error");
          throw res.status;
        } 
        return res;
      }
      fetch('http://localhost:8008/configs', { method: 'GET' })
        .then(handleErrors)
        .then((res) => res.json())
        .then((res) => setData(res.getConfigs))
    }, [setData]);

    return (
      <div className="App">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label>Client ID</label>
        <input name="Client_ID" ref={register({ required: true})} defaultValue={data?.Client_ID}/>
        <label>Your API Token</label>
        <input name="API_Token" ref={register({ required: true })} defaultValue={data?.API_Token}/>
        <input type="submit" />
        <span>if you are doing a new stream/live you should login again.</span>
      </form>
      <div className="App">

      <Button variant="contained" color="primary" onClick={regenConfigs}>
        Regenerate Configs
      </Button>

      </div>
      </div>
    );
  }
  
  export default App;
