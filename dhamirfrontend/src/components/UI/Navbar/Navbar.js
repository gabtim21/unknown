import React from 'react';

import NavbarItem from './NavbarItem/NavbarItem';

import classes from './Navbar.css';

const navbar = () => (<header>
    <nav className={classes.Navbar}>
        <ul className={classes.NavbarList}>
            <NavbarItem
                index={0}
                to="/"
                exact
                label="Inicio" />
            <NavbarItem
                index={1}
                to="/login"
                exact
                label="Iniciar Sesión" />
        </ul>
    </nav>
</header>);

export default navbar;