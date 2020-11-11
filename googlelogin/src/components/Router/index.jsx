import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Settings from "../../pages/Settings";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const Router = () => {
  return (
    <BrowserRouter>
    <AppBar position="static">
      <Toolbar>
      <Button color="inherit" >
        <Link to="/" className='FakeBTN'>Home</Link>
      </Button>
      <Button color="inherit" >
        <Link to="/login" className='FakeBTN'>Login</Link>
      </Button>
      <Button color="inherit" >
        <Link to="/settings" className='FakeBTN'>Settings</Link>
      </Button>
      </Toolbar>
    </AppBar>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
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
