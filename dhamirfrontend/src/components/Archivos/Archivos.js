import React from 'react';
import Archivo from './Archivo/Archivo';

import classes from './Archivos.css';

const archivos = () => (
    <div className={classes.Archivos}>
    <div>
        <table>
            <thead>
                <tr>
                    <td>Nombre</td>
                    <td>Tipo</td>
                    <td>Version</td>
                    <td>Ult. modificacion</td>
                    <td>Fecha</td>
                    <td>Acciones</td>
                </tr>
            </thead>
            <tbody>
                <Archivo
                    name="arch1"
                    type="pdf"
                    version="2"
                    ultima_modif="pedro"
                    fecha="8/8/8" />
            </tbody>
        </table>
        </div>
    </div>);

export default archivos;