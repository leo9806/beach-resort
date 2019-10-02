import React from 'react';
import './App.css';

import Home from './pages/Home';
import Rooms from './pages/Rooms';
import SingleRoom from './pages/SingleRoom';
import Error from './pages/Error';

import {Route, Switch} from 'react-router-dom';

import Navbar from './components/Navbar';

function App() {
  return (
      <>
      <Navbar />
      <Switch>
        {/*
        -The '/' represents the home page
        -The 'exact' is there to check that the path
        matches exactly the path given in the Route
        */}
        <Route exact path="/" component={Home} />
        <Route exact path="/rooms" component={Rooms} />
        {/*
          The 'dang' variable at the end of the path represents
          the specific sinle room, e.g. "presidential suite"
        */}
        <Route exact path="/rooms/:dang" component={SingleRoom} />
        <Route component={Error} />
      </Switch>
      </> 
  );
}

export default App;
