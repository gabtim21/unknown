import React, { Component } from 'react';
import {NavLink, Link} from 'react-router-dom';

import axios from '../../shared/axios-fmcloud';

import classes from '../Sede/Sede.css';
import ImgArchivo from '../../assets/archivo.jpg';


class Carpeta extends Component{
	eliminarHandler = () => {
		if (window.confirm("¿Seguro que quiere eliminarlo? Todos los archivos dentro tambien se eliminaran")) {
		axios.delete('carpetas/all/'+this.props._id+'')
			.then(response => {
				this.props.recargar()
			})
			.catch(err => {
				alert('no funciona')
			})
		}
	}
	render(){
		let botones = (
			<span>
				<button className={classes.Edit} onClick='/{props.key}'>Editar</button>
				<button className={classes.Elim} onClick={this.eliminarHandler}>Eliminar</button>
			</span>
			);
		return (
			<div className={classes.Sedes} >
				<Link to={'/sedes/'+this.props.sede+'/'+this.props._id}>
					<img className={classes.Imagen} src={ImgArchivo}/>
					<h4>{this.props.name}</h4>
					<p>{this.props.description}</p><br/>
				</Link>
				{localStorage.getItem('tipo_user')=="alto"?botones:null}
			</div>
		);
	}
}

export default Carpeta;