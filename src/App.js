import React from 'react';
import './App.css';

import Home from './pages/Home';
import Rooms from './pages/Rooms';
import SingleRoom from './pages/SingleRoom';
import Error from './pages/Error';

import {Route, Switch} from 'react-router-dom';

function App() {
  return (
      <>
      {/*
        -The '/' represents the home page
        -The 'exact' is there to check that the path
        matches exactly the path given in the Route
      */}
      <Route exact path="/" component={Home} />
      <Route exact path="/rooms" component={Rooms} />
      <Route exact path="/single-room" component={SingleRoom} />
      </> 
  );
}

export default App;
