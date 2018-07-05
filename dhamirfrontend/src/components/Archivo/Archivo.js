import React, { Component } from 'react';

import axios from '../../shared/axios-fmcloud';

import classes from '../Archivos/Archivos.css';


class Archivo extends Component{

	eliminarHandler = () => {
		if (window.confirm("¿Seguro que quiere eliminarlo?")) {
		axios.delete('files/'+this.props._id)
			.then(response => {
				this.props.recargar()
			})
			.catch(err => {
				alert('Oops, ha ocurrido un error')
			})
		}
	}
	descargarHandler = () =>{
	}
	subirHandler = () =>{
	}
	render(){
		let btnDesc = (
				<button className={classes.Desc} onClick='/:id'>Descargar</button>);
		let btnSubi = (
			<span>
				{btnDesc}
				<button className={classes.Edit} onClick='/:id'>Subir</button>
			</span>);
		let btnElim = (
			<span>
				{btnSubi}
				<button className={classes.Elim} onClick={this.eliminarHandler}>Eliminar</button>
			</span>);
		return (
			
			<tr>
				<td>{this.props.name}</td>
				<td>{this.props.type}</td>
				<td>{this.props.fecha}</td>
				<td>{this.props.version}</td>
				<td>{this.props.ultima_modif}</td>
				<td>
					{this.props.permisos=="subir"?btnSubi:null}
					{this.props.permisos=="descargar"?btnDesc:null}
					{this.props.permisos=="eliminar"?btnElim:null}
					{localStorage.getItem('tipo_user')=="alto"?btnElim:null}
				</td>
			</tr>);
	}
}

export default Archivo;