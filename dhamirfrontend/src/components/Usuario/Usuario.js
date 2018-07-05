import React, { Component } from 'react';
import {NavLink, Link} from 'react-router-dom';
import FormularioUsuario from '../FormularioUsuario/FormularioUsuario';

import axios from '../../shared/axios-fmcloud';

import classes from '../Archivos/Archivos.css';


class Usuario extends Component{

	eliminarHandler = () => {
		if (window.confirm("¿Seguro que quiere eliminarlo?")) {
			axios.delete('user/'+this.props._id+'')
				.then(response => {
					this.props.recargar()
				})
				.catch(err => {
					alert('Oops, algo va mal')
				})
		}
	}

	editarHandler = () => {
    	<FormularioUsuario
			key={this.props._id}
			_id={this.props._id}
			name={this.props.name}
			email={this.props.email}
			tipo_user={this.props.tipo_user}
			cel={this.props.cel}
			dni={this.props.dni}/>
	}

	render(){
		return (
			<tr>
				<td>{this.props.name}</td>
				<td>{this.props.email}</td>
				<td>{this.props.tipo_user}</td>
				<td>{this.props.cel}</td>
				<td>{this.props.dni}</td>
				<td>
					<Link to="/usuarios/ingresar" onClick={this.editarHandler}><button className={classes.Edit}>Editar</button></Link>
					<button className={classes.Elim} onClick={this.eliminarHandler}>Eliminar</button>
				</td>
			</tr>);
	}
}

export default Usuario;