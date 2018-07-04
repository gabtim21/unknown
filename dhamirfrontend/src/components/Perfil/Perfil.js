import React, { Component } from 'react';
import classes from '../Perfil/Perfil.css';
import axios from '../../shared/axios-fmcloud';

const perfil = (props) => {
	
	

	const data = props.data;
	console.log(data);

	return(
		<tr className={classes.Perfil}>
			<td className={classes.Imagen}>
				<img src=""/>
			</td>
			<td className={classes.Info}>
				<h3><label>Nombre: </label>{props.name}</h3>
				<h3><label>E-mail: </label>{props.email}</h3>
				<h3><label>Teléfono: </label>{props.telefono}</h3>
				<h3><label>Celular: </label>{props.celular}</h3>
				
			</td>
		</tr>
	);
}

export default perfil;