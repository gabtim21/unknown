import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import axios from '../../shared/axios-fmcloud';

import classes from '../Archivos/Archivos.css';


class Usuario extends Component{

	eliminarHandler = () => {
		axios.delete('user/'+this.props._id+'')
			.then(response => {
				alert('se elimino correctamente')
			})
			.catch(err => {
				alert('no funciona: user/'+this.props.key+'')
			})
	}

	render(){
		return (
			<tr>
				<td>{this.props.name}</td>
				<td>{this.props.dni}</td>
				<td>{this.props.cel}</td>
				<td>{this.props.email}</td>
				<td>
					<button className={classes.Edit} onClick='/{props.key}'>Editar</button>
					<button className={classes.Desc} onClick='/{props.key}'>Descargar</button>
					<button className={classes.Elim} onClick={this.eliminarHandler}>Eliminar</button>
				</td>
			</tr>);
	}
}

export default Usuario;