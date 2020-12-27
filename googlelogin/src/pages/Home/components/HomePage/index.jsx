import React, { Component } from "react";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";

const date0 = new Date();
let now = new Date();

const isTokenExpired = () => {
  //const token = localStorage.getItem("access_token");
  try {
    const date = new Date(0);
    date.setUTCSeconds("3599");
    return date.valueOf() > new Date().valueOf();
  } catch (err) {
    return false;
  }
};

const GET_CONFIGS = loader("../../../../graphql/configs.graphql");

function GetData() {
  const { loading, error, data } = useQuery(GET_CONFIGS);

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return <main>{JSON.stringify(data)}</main>;
}
export default class index extends Component {
  render() {
    let current_time = Date.now() / 1000;
    // if (current_time > jwt.exp) { /* expired */ }
    return (
      <div>
        <GetData />
        {JSON.stringify(new Date().getTimezoneOffset())} <br></br>
        {JSON.stringify(date0.getUTCDate())} <br></br>
        {JSON.stringify(now)} <br></br>
        {JSON.stringify(date0.toLocaleString())} <br></br>
        {JSON.stringify(new Date(1603174152112))} <br></br>
        {JSON.stringify(new Date(1603174152112).toLocaleString())} <br></br>
        {JSON.stringify(new Date(1603174152112).toLocaleTimeString())} <br></br>
        {current_time > 3599
          ? `${"true "}${JSON.stringify(current_time)}`
          : `${"false"} ${JSON.stringify(current_time)}`}
      </div>
    );
  }
}
