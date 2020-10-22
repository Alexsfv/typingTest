import React from 'react';
import './App.scss';
import {Switch, Redirect, Route} from 'react-router-dom'
import Main from './Pages/Main'
import Leaders from './Pages/Leaders'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/leaders' component={Leaders} />
        <Route exact path='/' component={Main} />
        <Redirect to='/' />
      </Switch>
    </div>
  );
}

export default App;
