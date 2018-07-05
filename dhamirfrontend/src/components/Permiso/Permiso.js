import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from '../../shared/axios-fmcloud';

import classes from '../Archivos/Archivos.css';


class Permiso extends Component{

	render(){
		return (
			<tr>
				<td>{this.props.name}</td>
				<td>{this.props.type}</td>
				<td>{this.props.fecha}</td>
				<td>{this.props.version}</td>
				<td>
		    	<Link to={'/sedes/'+this.props.idCarpeta+'/permiso/'+this.props._id}>
		    		<button className={classes.Elim}>Pedir permiso</button>
		    	</Link>
				</td>
			</tr>);
	}
}

export default Permiso;