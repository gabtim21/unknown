import React from 'react';
import {Link} from 'react-router-dom';
import Classes from './Footer.css';
import Taladro from '../../assets/Taladro.gif';

const footer = () => (
	<div className={Classes.Footer}>
			<div className={Classes.containerAll}>
			
			<img className={Classes.imag} src={Taladro}/>
		<center>
			<div className={Classes.container1}>
				<p><Link className={Classes.links} to="/sedes">Sedes</Link></p>
			</div>
			<div className={Classes.container2}>
				<p><Link className={Classes.links} to="/usuarios">Usuarios</Link></p>
			</div>
			<div className={Classes.container3}>
				<p><Link className={Classes.links} to="/perfil">Perfil</Link></p>
			</div>
			<div className={Classes.container4}>
				<p><Link className={Classes.links} to="/conocenos">Conocenos</Link></p>
			</div>
		</center>
		
			</div>
		<center>
			<h3>Constructora Dhamir</h3>
			<h4>Arequipa - 2018</h4>
		</center>
	</div>);

export default footer;