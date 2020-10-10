import React from 'react';
import './App.css';
import {GoogleLogin, GoogleLogout} from 'react-google-login';

const responseGoogle = (response) => {
  console.log(response);
}

const logout = (response) => {
  console.log(response);
}

function App() {
  return (
    <div className="App">
      <GoogleLogin
    clientId="0000.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
  <GoogleLogout
      clientId="0000.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={logout}
    >
    </GoogleLogout>
    </div>
  );
}

export default App;
