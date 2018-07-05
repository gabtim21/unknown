import React, { Component } from 'react';
import {NavLink, Link} from 'react-router-dom';

import axios from '../../shared/axios-fmcloud';

import classes from '../Carpeta/Carpeta.css';
import Cpt from '../../assets/Cpt.png';

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
			<div className={classes.contenttwo} >
			<div className={classes.contentdetailsfora}>
				<Link to={'/sedes/'+this.props.sede+'/'+this.props._id}>
					<img src={Cpt}/>
					<h4><a className={classes.DetalleCarpeta}>{this.props.name}</a></h4>
					<p>{this.props.description}</p><br/>
				</Link>
				{localStorage.getItem('tipo_user')=="alto"?botones:null}
			</div>
			</div>
		);
	}
}

export default Carpeta;