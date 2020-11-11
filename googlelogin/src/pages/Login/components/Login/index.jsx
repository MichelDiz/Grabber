import React, { useState, useEffect } from "react";
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
 
 const error = response => {
   console.error(response)
 }

 function App() {

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
          </> : "Please, provide your Cliend ID and API Token on the settings page." }
      </div>
    );
  }
  
  export default App;
