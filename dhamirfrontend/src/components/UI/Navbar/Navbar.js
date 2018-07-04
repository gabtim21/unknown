import React from 'react';
import NavbarItem from './NavbarItem/NavbarItem';

import classes from './Navbar.css';

const navbar = () => {
    const isAuthenticated = localStorage.getItem('name');
    return (<header>
    <nav className={classes.Navbar}>
        <ul className={classes.NavbarList}>
            {!isAuthenticated?
                <NavbarItem
                    index={0}
                    to="/login"
                    label="Iniciar Sesión"/>
                :<NavbarItem
                    index={0}
                    to="/logout"
                    label="Cerrar sesión" />
            }
            <NavbarItem
                index={1}
                to="/"
                exact
                label="Home" />
            <NavbarItem
                index={2}
                to="/usuarios"
                exact
                label="Usuarios" />
            <NavbarItem
                index={3}
                to="/sedes"
                exact
                label="Sedes" />
        </ul>
    </nav>
</header>)
};

export default navbar;