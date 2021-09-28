import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {connect} from "react-redux";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { StyledContainer } from './components/Styles.js';

import Home from "./pages/Home/Home";
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Dashboard from "./pages/Dashboard/Dashboard";
import EmailActivation from "./pages/EmailActivation/EmailActivation.jsx";

import AuthRoute from './components/StartRoutes/AuthRoute.jsx';
import BasicRoute from './components/StartRoutes/BasicRoute.jsx';



const App = ({checked}) => {
 
    return (
      <BrowserRouter>
      {checked &&
        <StyledContainer>
          <Switch>
          <BasicRoute path="/activate/:userEmail">
              <EmailActivation />
            </BasicRoute>
            <BasicRoute path="/signup">
              <Signup />
            </BasicRoute>
            <BasicRoute path="/login/:userEmail?">
              <Login />
            </BasicRoute>
            <AuthRoute path="/dashboard">
              <Dashboard />
            </AuthRoute>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </StyledContainer>
      }     
      </BrowserRouter>
    );
}

const mapStateToProps = ({session}) => ({
  checked: session.checked
})

export default connect(mapStateToProps)(App);
