import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import './App.css';
import store from './store'
import { setCurrentUser, getCurrentUser } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/common/PrivateRoute';
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import DashBoard from './components/dashboard/DashBoard';
const App = () => {

  const { jwtToken } = localStorage


  // check for token in localStorage
  if (jwtToken) {
    //decode token to extract user info
    const decode = jwt_decode(jwtToken);
    //set token to axios header
    setAuthToken(jwtToken);
    //set current user
    store.dispatch(setCurrentUser(decode));
    store.dispatch(getCurrentUser());
  }

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/dashboard" component={DashBoard} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
