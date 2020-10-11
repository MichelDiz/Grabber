import React, { useState, useEffect } from "react";
import './App.css';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import { useForm } from "react-hook-form";

const responseGoogle = (response) => {
  console.log(response);
}

const logout = (response) => {
  console.log(response);
}

const onSubmit = data => {
  alert(JSON.stringify(data));
};

function App() {

  const { register, handleSubmit } = useForm();
  const [data, setData] = useState();

  useEffect(() => {
    fetch('http://localhost:8008/configs', {method: 'GET'})
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [setData]);

  return (
    <div className="App">
      {data && data.Client_ID ? <>
      <GoogleLogin
        clientId={`${data.Client_ID}`}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'} />
        <GoogleLogout
          clientId={`${data.Client_ID}`}
          buttonText="Logout"
          onLogoutSuccess={logout}
        >
        </GoogleLogout>
        </> : null}
      <form onSubmit={handleSubmit(data => setData(data))} className="form">
      <label>Client ID</label>
      <input name="Client_ID" ref={register} defaultValue={data?.Client_ID}/>
      <label>Your API Token</label>
      <input name="API_Token" ref={register} defaultValue={data?.API_Token}/>
      <input type="submit" />
    </form>

    </div>
  );
}

export default App;
