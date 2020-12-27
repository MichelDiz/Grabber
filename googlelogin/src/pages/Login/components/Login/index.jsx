import React from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";

const GET_CONFIGS = loader("../../../../graphql/configs.graphql");

const responseGoogle = (response) => {
  fetch("http://localhost:8008/addconfigs", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ response }),
  });
};

const logout = () => {
  console.log("logout");
};

const error = (response) => {
  console.error(response);
};

function App() {
  const { loading, error, data } = useQuery(GET_CONFIGS);

  if (loading) return "loading";
  if (error) return `Error! ${error}`;

  const { Client_ID } = data.getConfigs;

  if (!!Client_ID)
    return (
      <div className="App">
        <GoogleLogin
          clientId={`${Client_ID}`}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={error}
          cookiePolicy={"single_host_origin"}
          theme="dark"
        />
        <GoogleLogout
          theme="dark"
          clientId={`${Client_ID}`}
          buttonText="Logout"
          onLogoutSuccess={logout}
        ></GoogleLogout>
      </div>
    );

  return (
    <div className="App">
      "Please, provide your Cliend ID and API Token on the settings page."
    </div>
  );
}

export default App;
