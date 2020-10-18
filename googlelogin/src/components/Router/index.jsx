import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import Home from "../../pages/Home";
import Login from "../../pages/Login";

const Router = () => {

  return (
    <BrowserRouter>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
