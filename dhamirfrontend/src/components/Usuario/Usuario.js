import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from '../Archivos/Archivos.css';

const usuario = (props) => 
(<tr>
	<td>{props.name}</td>
	<td>{props.dni}</td>
	<td>{props.cel}</td>
	<td>{props.email}</td>
	<td>
		<button className={classes.Edit} onClick='/:id'>Editar</button>
		<button className={classes.Desc} onClick='/:id'>Descargar</button>
		<button className={classes.Elim} onClick='/:id'>Eliminar</button>
	</td>
</tr>);

export default usuario;