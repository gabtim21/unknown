import React, {Component} from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { Redirect } from 'react-router';

import classes from './App.css';

import Home from './components/Home/Home';
import Navbar from './components/UI/Navbar/Navbar';
import Login from './components/Login/Login';
import Archivos from './components/Archivos/Archivos';
import Carpetas from './components/Carpetas/Carpetas';

class App extends Component {
  render(){
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/logout' render={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            return (<Redirect to='/login' />)
          }} />
          <Route path='/archivos' component={Archivos} />
          <Route path='/carpetas' component={Carpetas} />
          <Route render={() => <h1>Not found</h1>}/>
        </Switch>
      </div>
    </BrowserRouter>);
  }
}

export default App;
