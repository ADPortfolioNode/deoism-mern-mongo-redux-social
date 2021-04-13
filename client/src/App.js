import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import store from './store';

import setAuthToken from './utils/setAuthToken';
import {Provider} from 'react-redux';
import {loadUser} from './actions/auth';
import './App.css';


if (localStorage.token) {
  setAuthToken(localStorage.token);
}  

const App = () => {

useEffect(()=> {
     store.dispatch(loadUser());
         // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);
 
  return(
  <Provider store={ store }> 
  <Router>
    <Fragment>
      <Navbar />
        <Route exact path='/' component={ Landing } />
          <section className="container">
          <Switch>
            <Route exact path="/register" component={ Register } />
            <Route exact path="/login" component={ Login } /> 
            <PrivateRoute exact path="/dashboard" component={ Dashboard } />
            <PrivateRoute exact path="/create-profile" component={ CreateProfile } />
            <PrivateRoute exact path="/edit-profile" component={ EditProfile } />
            <PrivateRoute exact path="/add-experience" component={ AddExperience } />
            <PrivateRoute exact path="/add-education" component={ AddEducation } />
            
          </Switch>
          
          <Alert />
      </section> 
    </Fragment>
  </Router>

  </Provider>
)
};

export default App;


