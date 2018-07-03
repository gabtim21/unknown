import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import axios from '../../shared/axios-fmcloud';

import classes from './Sede.css';
import ImgArchivo from '../../assets/archivo.jpg';


class Sede extends Component{
	eliminarHandler = () => {
		axios.delete('sedes/'+this.props._id+'')
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
			<div className={classes.Sedes} ><a href="">
				<img className={classes.Imagen} src={ImgArchivo}/></a>
				<h4><a className={classes.DetalleSede} href="">{this.props.name}</a></h4>
				<p>{this.props.description}</p><br/>
					<button className={classes.Edit} onClick='/{props.key}'>Editar</button>
					<button className={classes.Elim} onClick={this.eliminarHandler}>Eliminar</button>
			</div>
		);
	}
}

export default Sede;

/*
			<div className={classes.item}>
				<img src={this.props.imagen} alt=""/>
				<p><h3>{this.props.name}</h3><br/>{this.props.description}<br/>
					<button className={classes.Edit} onClick='/{props.key}'>Editar</button>
					<button className={classes.Elim} onClick={this.eliminarHandler}>Eliminar</button>
				</p>
			</div>*/