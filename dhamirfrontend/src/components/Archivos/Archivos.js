import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import Archivo from '../Archivo/Archivo';

import axios from '../../shared/axios-fmcloud';

import classes from './Archivos.css';

import Table from '../UI/Table/Table';

class Archivos extends Component{
	state = {
		data: null
	}
	componentDidMount(){
		this.cargarData()
	}
	cargarData = () => {
		axios.get('files')
			.then(response => {
				console.log('mi data',response.data.data)
				this.setState({
					data: response.data.data
				});
			})
			.catch(err => {
				alert('no funciona')
			})
	}
	render(){
		const headers = [
			'Nombre',
			'Tipo',
			'Version',
			'Ult. modificacion',
			'Fecha',
			'Acciones'
		];

		let rows = null;
		if(this.state.data!==null)
			rows = this.state.data.map(item => (<Archivo
												key={item._id}
												_id={item._id}
												name={item.name}
										        type={item.tipo}
										        version={item.version}
										        ultima_modif={item.ultima_modif}
										        fecha={item.fecha}
												recargar={this.cargarData}/>));
										        
		return (<div className={classes.Archivos}>
	    	<div>
	    	<Link to="/archivos-ingresar"><button className={classes.Add}>Ingresar archivo</button></Link>
		    	<Table 
		    		headers={headers}
		    		rows={rows} />
	        </div>
	    </div>);
	}
}

export default Archivos;