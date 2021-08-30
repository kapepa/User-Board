import React from "react";
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './page/Home/Home'
import Users from './page/Users/Users';
import NoMatch from './page/NoMatch/NoMatch';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/users">
          <Users />
        </Route>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="*">
          <NoMatch/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
