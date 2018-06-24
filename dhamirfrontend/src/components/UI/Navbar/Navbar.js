import React from 'react';
import NavbarItem from './NavbarItem/NavbarItem';

import classes from './Navbar.css';

const navbar = () => (<header>
    <nav className={classes.Navbar}>
        <ul className={classes.NavbarList}>
            <NavbarItem
                index={0}
                to="/login"
                exact
                label="Iniciar Sesión" />
            <NavbarItem
                index={1}
                to="/"
                exact
                label="Home" />
            <NavbarItem
                index={2}
                to="/signup"
                exact
                label="Registrate" />
            <NavbarItem
                index={3}
                to="/archivos"
                exact
                label="Archivos" />
            <NavbarItem
                index={4}
                to="/carpetas"
                exact
                label="Carpetas" />
        </ul>
    </nav>
</header>);

export default navbar;