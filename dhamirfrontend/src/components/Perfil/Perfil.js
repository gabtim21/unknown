import React, { Component } from 'react';
import classes from '../Perfil/Perfil.css';
import axios from '../../shared/axios-fmcloud';
import Usuario from '../../assets/user.png';

const perfil = (props) => {
	
	

	const data = props.data;
	console.log(data);

	return(
		<tr className={classes.Perfil}>
		<h1 className={classes.Titulo}>Perfil del Usuario</h1>
			<td className={classes.Imagen}>
				<img src={Usuario}/>
			</td>
			<td className={classes.Info}>
				<h3><label>Nombre: </label>{props.name}</h3>
				<h3><label>E-mail: </label>{props.email}</h3>
				<h3><label>Teléfono: </label>{props.telefono}</h3>
				<h3><label>Celular: </label>{props.celular}</h3>
				<h3><label>DNI: </label>{props.dni}</h3>
				<h3><label>Sede: </label>{props.sede}</h3>
				
			</td>
		</tr>
	);
}

export default perfil;