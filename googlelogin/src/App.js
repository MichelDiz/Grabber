import React, { useState, useEffect } from "react";
import './App.css';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import { useForm } from "react-hook-form";

const responseGoogle  = (response) => {
   fetch('http://localhost:8008/addconfigs', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({response})
  });
}

const logout = () => {
  console.log('logout')
}

const onSubmit  = async (response) => {
  await fetch('http://localhost:8008/addconfigs', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({response})
  });
}

const error = response => {
  console.error(response)
}

function App() {

  const { register, handleSubmit } = useForm();
  const [data, setData] = useState({});

  useEffect(() => {
    fetch('http://localhost:8008/configs', {method: 'GET'})
      .then((res) => res.json())
      .then((res) => setData(res))
  }, [setData]);


  return (
    <div className="App">
      {data && data.Client_ID ? <>
      <GoogleLogin
        clientId={`${data.Client_ID}`}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={error}
        cookiePolicy={'single_host_origin'}
        theme="dark" />
        <GoogleLogout
          theme="dark"
          clientId={`${data.Client_ID}`}
          buttonText="Logout"
          onLogoutSuccess={logout}
        >
        </GoogleLogout>
        </> : null}
      <form onSubmit={handleSubmit(onSubmit)} className="form">
      <label>Client ID</label>
      <input name="Client_ID" ref={register({ required: true})} defaultValue={data?.Client_ID}/>
      <label>Your API Token</label>
      <input name="API_Token" ref={register({ required: true })} defaultValue={data?.API_Token}/>
      <input type="submit" />
      <span>if you are doing a new stream/live you should login again.</span>
    </form>

    </div>
  );
}

export default App;
