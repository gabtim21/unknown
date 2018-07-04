import React, { Component } from 'react';

import axios from '../../shared/axios-fmcloud';

import classes from '../Archivos/Archivos.css';


class Archivo extends Component{

	eliminarHandler = () => {
		axios.delete('files/'+this.props._id+'')
			.then(response => {
				alert('se elimino correctamente')
				this.props.recargar()
			})
			.catch(err => {
				alert('Oops, ha ocurrido un error')
			})
	}

	render(){
		return (
			<tr>
				<td>{this.props.name}</td>
				<td>{this.props.type}</td>
				<td>{this.props.version}</td>
				<td>{this.props.ultima_modif}</td>
				<td>{this.props.fecha}</td>
				<td>
					<button className={classes.Edit} onClick='/:id'>Editar</button>
					<button className={classes.Desc} onClick='/:id'>Descargar</button>
					<button className={classes.Elim} onClick={this.eliminarHandler}>Eliminar</button>
				</td>
			</tr>);
	}
}

export default Archivo;