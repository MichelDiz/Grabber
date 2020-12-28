import React, { Component } from "react";
import { useQuery, useSubscription } from "@apollo/client";
import { loader } from "graphql.macro";

const date0 = new Date();
let now = new Date();

const default_offset = "0";

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

const GET_CONFIGS = loader("../../../../graphql/subscribeMessages.graphql");
const COUNT_MSGS = loader("../../../../graphql/subscCountMsgs.graphql");

function GetData() {
  const { loading, error, data } = useSubscription(GET_CONFIGS, {
    variables: { default_offset },
  });

  if (loading) return null;
  if (error) return `Error! ${JSON.stringify(error)}`;

  return <main>{JSON.stringify(data)}</main>;
}
function CountMsgs() {
  const { loading, error, data } = useSubscription(COUNT_MSGS);

  if (loading) return null;
  if (error) return `Error! ${JSON.stringify(error)}`;

  return (
    <div className="App">
      <h1>Total of messages: {JSON.stringify(data.aggregateMessage.count)}</h1>
      <p>Total of {Math.round(data.aggregateMessage.count / 6)} pages</p>
    </div>
  );
}
function ChatWall() {
  const { loading, error, data } = useSubscription(GET_CONFIGS, {
    variables: { default_offset },
  });

  if (loading) return null;
  if (error) return `Error! ${JSON.stringify(error)}`;

  return (
    <>
      <div className="App">
        {data &&
          data.queryMessage.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
      </div>
    </>
  );
}
function ChatMessage(props) {
  const { messageText, authorDetails } = props.message;
  return (
    <>
      <div className={`message`}>
        <div>
          <img
            src={
              authorDetails
                ? "https://yt3.ggpht.com/ytc/AAUvwnh9_qoajBoWtOjcfUCKCv3gBySz2T_ZLulmvfPpaw=s48-c-k-c0xffffffff-no-rj-mo"
                : authorDetails[0].profileImageUrl
            }
          />
        </div>
        <div>
          <p>{messageText}</p>
        </div>
      </div>
    </>
  );
}

export default class index extends Component {
  render() {
    let current_time = Date.now() / 1000;
    // if (current_time > jwt.exp) { /* expired */ }
    return (
      <div>
        <CountMsgs />
        <ChatWall />
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
