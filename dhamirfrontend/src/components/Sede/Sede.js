import React, { Component } from 'react';
import {NavLink, Link} from 'react-router-dom';

import axios from '../../shared/axios-fmcloud';

import classes from './Sede.css';
import ImgArchivo from '../../assets/archivo.jpg';

class Sede extends Component{
	eliminarHandler = () => {
		if (window.confirm("¿Seguro que quiere eliminarlo?")) {
		axios.delete('sedes/'+this.props._id+'')
			.then(response => {
				this.props.recargar()
			})
			.catch(err => {
				alert('Oops, algo va mal')
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
				<Link to={'sedes/'+this.props._id}>
					<img className={classes.Imagen} src={ImgArchivo}/>
					<h4><a className={classes.DetalleSede} href="">{this.props.name}</a></h4>
					<p>{this.props.description}</p><br/>
				</Link>
				{localStorage.getItem('tipo_user')=="alto"?botones:null}
			</div>
		);
	}
}

export default Sede;