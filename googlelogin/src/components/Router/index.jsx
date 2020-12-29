import React from "react";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";

import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Settings from "../../pages/Settings";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

function CheckSearch(e) {
  switch (e.expr) {
    case "?home":
      return (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      );
    case "?settings":
      return (
        <Redirect
          to={{
            pathname: "/settings",
          }}
        />
      );
    case "?login":
      return (
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      );
    default:
      return (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      );
  }
}

const Router = () => {
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit">
            <Link to="/" className="FakeBTN">
              Home
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="/login" className="FakeBTN">
              Login
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="/settings" className="FakeBTN">
              Settings
            </Link>
          </Button>
        </Toolbar>
      </AppBar>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route
          exact
          path="/index.html"
          render={() =>
            !window.location.search ? (
              <Route exact path="/">
                <Home />
              </Route>
            ) : (
              <CheckSearch expr={window.location.search} />
            )
          }
        />

        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/settings">
          <Settings />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
