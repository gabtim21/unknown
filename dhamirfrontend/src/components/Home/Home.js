import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import classes from '../Home/Home.css';
import axios from '../../shared/axios-fmcloud';

import constructora from '../../assets/constructora.jpg';
import constructora2 from '../../assets/constructora2.jpg';


const home = () => (<div className={classes.Home}>
	
	<h1 className={classes.title}>Constructora DHAMIR</h1>
	<h2 className={classes.content}>Empresa dedicada al rubro de la construcción alrededor de todo el Perú, con una trayectoria de mas de 10 años, aaaaaaaaaaaaaaaaaaateniendo como misión, y visión</h2>
		<Link to="/login"><button className={classes.boton}>Iniciar Sesión</button></Link>

	</div>
	);

export default home;
/*<div className={classes.slider}>
		<ul>
			<li>
				<img src={constructora} alt="Constructora"  />

			</li>
			<li>
				<img src={constructora2} alt="Constructora2"  />
			</li>
		</ul>
	</div>*/