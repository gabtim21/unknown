import React, { Component } from 'react';
import {NavLink, Link} from 'react-router-dom';

import axios from '../../shared/axios-fmcloud';

import classes from './Sede.css';
import Sedes from '../../assets/sedes.png';

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
			<div className={classes.contenttwo}>
			<div className={classes.contentdetailsfora} >
				<Link to={'sedes/'+this.props._id}>
					<img src={Sedes}/>
					<h4><a className={classes.DetalleSede} href="">{this.props.name}</a></h4>
					<p>{this.props.description}</p><br/>
				</Link>
			</div>
				{localStorage.getItem('tipo_user')=="alto"?botones:null}

			</div>
		);
	}
}

export default Sede;