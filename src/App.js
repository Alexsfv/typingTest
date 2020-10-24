import React from 'react';
import './App.scss';
import {Switch, Redirect, Route} from 'react-router-dom'
import Main from './Pages/Main'
import Leaders from './Pages/Leaders'
import device from 'current-device'
import Author from './Components/Author/Author'

function App() {
  const leadersPath = device.type === 'mobile' ? '/leaders/mobile' : '/leaders/desktop'
  
  return (
    <div className="App">
      <Switch>
        <Route path='/leaders/mobile' component={Leaders} />
        <Route path='/leaders/desktop' component={Leaders} />
        <Route exact path='/' component={Main} />

        <Redirect from='/leaders' to={leadersPath} />
        <Redirect to='/' />
      </Switch>
      <Author />
    </div>
  );
}

export default App;