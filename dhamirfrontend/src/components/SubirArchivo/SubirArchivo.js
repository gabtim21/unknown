import React from 'react';

import './SubirArchivo.css';
import '../../components/StyleGlobal/bootstrap.css';

const login = () => (
	<div className="login-page">
      <div className="container align-items-center">
        <div className="form-holder has-shadow">
          <div className="row">
            <div className="col-lg-6 ">
              <div className="info align-items-center">
                <div className="content">
                  <div className="logo">
                    <h1>DHAMIR</h1>
                  </div>
                  <p>Bienvenido a la pagina ingresa tus datos para continuar.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 bg-white">
              <div className="container form align-items-center">
                <div className="content">
                  <form id="login-form" method="post">
                    <div className="form-group">
                      <input id="login-username" type="text" name="loginUsername" required="" className="input-material"/>
                      <label className="label-material">Usuario</label>
                    </div>

                    <div className="form-group">
                        <input id="archivo-name" type="docx" name="achivoname" required="" className="input-material"/>
                        <label className="label-material">Seleccionar Archivo</label>
                    </div> 

                    <div className="form-group">
                        <input id="empresa-name" type="text" name="empresaname" required="" className="input-material"/>
                        <label className="label-material">Empresa</label>
                    </div>

                    <div className="form-group">
                        <input id="typerarchivo-name" type="docx" name="typearchivoname" required="" className="input-material"/>
                        <select className="label-material">
                            <option value="1">PDF</option>
                            <option value="2">DOC</option>
                        
                        </select>
                    </div>

                    <a id="login" href="index.html" className="btn btn-primary">Subir Archivo</a>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>);

export default login;