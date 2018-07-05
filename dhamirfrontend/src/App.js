import React, {Component} from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { Redirect } from 'react-router';

import classes from './App.css';

import Home from './components/Home/Home';
import Navbar from './components/UI/Navbar/Navbar';
import Login from './components/Login/Login';
import Sedes from './components/Sedes/Sedes';
import Archivos from './components/Archivos/Archivos';
import Carpetas from './components/Carpetas/Carpetas';
import Usuarios from './components/Usuarios/Usuarios';
import Perfil from './components/Perfil/Perfil';
import Footer from './components/Footer/Footer';
import Conocenos from './components/Conocenos/Conocenos';
import FormularioUsuario from './components/FormularioUsuario/FormularioUsuario';
import FormularioSede from './components/FormularioSede/FormularioSede';
import FormularioArchivo from './components/FormularioArchivo/FormularioArchivo';
import FormularioCarpeta from './components/FormularioCarpeta/FormularioCarpeta';

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

          <Route path='/perfil' component={Perfil} />

          <Route path='/sedes/:idSede/:idCarpeta/ingresar' component={FormularioArchivo} />

          <Route path='/sedes/:idSede/ingresar' component={FormularioCarpeta} />

          <Route path='/sedes/:idSede/:idCarpeta' component={Archivos} />          

          <Route path='/sedes/ingresar' component={FormularioSede} />
          
          <Route path='/sedes/:idSede' component={Carpetas} />
          
          <Route path='/usuarios/ingresar' component={FormularioUsuario} />

          <Route path='/usuarios' component={Usuarios} />


          <Route path='/sedes' component={Sedes} />

          <Route path='/conocenos' component={Conocenos}/>
          
          <Route render={() => <h1>Not found</h1>}/>
        </Switch>
        <Footer/>
      </div>
    </BrowserRouter>);
  }
}

export default App;
