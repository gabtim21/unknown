import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from '../Navbar.css';

const navbarItem = (props) => (<li key={props.index} className={classes.NavbarItem}>
	<NavLink 
	    to={props.to}
	    exact={props.exact}
	    activeClassName={classes.active}>
	    {props.label}
	</NavLink>
</li>);

export default navbarItem;