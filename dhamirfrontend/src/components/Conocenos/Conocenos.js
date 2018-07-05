import React, {Component} from 'react';

import Classes from './Conocenos.css';
import constructora2 from '../../assets/constructora2.jpg';
import descanso from '../../assets/descanso.jpg';
import enconstruccion from '../../assets/enconstruccion.gif';
import tractor from '../../assets/tractor.gif';



const extra = () => (
	<div className={Classes.info}>
	<br />
	<div className={Classes.contenttwo}>
	<center>
       <h1>Conoce de Nosotros</h1>
	</center>
			<div class={Classes.contentdetails}>


				<div className={Classes.contentdetailsfora}>
				<img src={tractor}/>
				<h3>HISTORIA</h3>
				<p>Dhamir Constructora e Inmobiliaria es una empresa dedicada a la construcción y gestión de proyectos inmobiliarios con más de 13 años a experiencia.
Kallpa Constructora e Inmobiliaria nace en el año 2003, como una empresa dedicada a la construcción y gestión de proyectos arquitectónicos comerciales y de habitación.</p>
				</div>
				<div className={Classes.contentdetailsfora}>
				<img src={enconstruccion}/>
				<h3>QUE OFRECEMOS?</h3>
				<p>Dhamir Constructora e Inmobiliaria ofrece a sus clientes la experiencia adquirida en estos 13 años de operaciones en el mercado inmobiliario peruano, contamos con un equipo de trabajo profesional que atenderán todas las solicitudes y requerimientos que nos presentan.</p>
				</div>

				<div className={Classes.contentdetailsfora}>
				<img src={descanso}/>
				<h3>EQUIPO</h3>
				<p>EN DHAMIR CONSTRUCTORA E INMOBILIARIA TENEMOS LAS MÁS ALTAS EXIGENCIAS DE CALIDAD EN LA ATENCIÓN PARA CON NUESTROS CLIENTES, CONTAMOS CON UN EQUIPO DE MÁS DE 15 PERSONAS DEDICADO A LA ASESORÍA EN LA COMPRA DE DEPARTAMENTOS Y VENTA DE LOS PROYECTOS DE CONSTRUCCIÓN E INVERSIÓN QUE MANEJAMOS.</p>
				</div>
				
				
			</div>
		</div>	
	</div>

)

export default extra;