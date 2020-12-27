import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";

const GET_CONFIGS = loader("../../../../graphql/configs.graphql");

const onSubmit = async (response) =>
  await fetch("http://localhost:8008/addconfigs", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ response }),
  });

const regenConfigs = async () =>
  await fetch("http://localhost:8008/autosetup", { method: "GET" });

function App() {
  const { loading, error, data } = useQuery(GET_CONFIGS);
  const { register, handleSubmit } = useForm();

  if (loading) return "loading";
  if (error) return `Error! ${error}`;

  const _data = data.getConfigs;

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label>Client ID</label>
        <input
          name="Client_ID"
          ref={register({ required: true })}
          defaultValue={_data?.Client_ID}
        />
        <label>Your API Token</label>
        <input
          name="API_Token"
          ref={register({ required: true })}
          defaultValue={_data?.API_Token}
        />
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
