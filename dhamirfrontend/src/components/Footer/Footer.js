import React from 'react';
import {Link} from 'react-router-dom';
import Classes from './Footer.css'

const footer = () => (
	<div className={Classes.Footer}>
		
			<p className={Classes.links}><Link to="/sedes">Sedes</Link></p>
			<p className={Classes.links}><Link to="/usuarios">Usuarios</Link></p>
			<p className={Classes.links}><Link to="/perfil">Perfil</Link></p>
			<p className={Classes.links}><Link to="/conocenos">Conocenos</Link></p>

		<center>
			<h2>Constructora Dhamir</h2>
			<h4>Arequipa - 2018</h4>
		</center>
	</div>);

export default footer;