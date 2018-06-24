import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from '../Archivos.css';

const archivo = (props) => 
(<tr>
	<td>{props.name}</td>
	<td>{props.type}</td>
	<td>{props.version}</td>
	<td>{props.ultima_modif}</td>
	<td>{props.fecha}</td>
	<td>
		<button className={classes.Edit} onClick='/:id'>Editar</button>
		<button className={classes.Desc} onClick='/:id'>Descargar</button>
		<button className={classes.Elim} onClick='/:id'>Eliminar</button>
	</td>
</tr>);

export default archivo;