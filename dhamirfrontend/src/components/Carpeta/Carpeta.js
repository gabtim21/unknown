import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import axios from '../../shared/axios-fmcloud';

import classes from '../Sede/Sede.css';


class Carpeta extends Component{
	eliminarHandler = () => {
		axios.delete('carpetas/'+this.props._id+'')
			.then(response => {
				alert('se elimino correctamente')
				this.props.recargar()
			})
			.catch(err => {
				alert('no funciona')
			})
	}
	render(){
		return (
			<div ><a href="">
				<img src="localhost:6060\\{this.props.imagen}"/></a>
				<h4><a href="">{this.props.name}</a></h4>
				<p>{this.props.description}</p><br/>
					<button className={classes.Edit} onClick='/{props.key}'>Editar</button>
					<button className={classes.Elim} onClick={this.eliminarHandler}>Eliminar</button>
			</div>
		);
	}
}

export default Carpeta;