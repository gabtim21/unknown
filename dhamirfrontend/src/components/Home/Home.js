import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from '../Home/Home.css';
import constructora from '../../assets/constructora.jpg';
import constructora2 from '../../assets/constructora2.jpg';


const home = () => (<div className={classes.Home}>
	<div className={classes.slider}>
		<ul>
			<li>
				<img src={constructora} alt="Constructora"  />
			</li>
			<li>
				<img src={constructora2} alt="Constructora2"  />
			</li>
		</ul>
	</div>
	</div>);

export default home;